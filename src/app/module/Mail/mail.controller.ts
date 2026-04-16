import { Request, Response, NextFunction } from "express";
import { sendBulkMails } from "../../services/mailQueue.service.js";
import { WebsiteModel } from "../Website/website.model.js";
import { TemplateModel } from "../template/template.model.js";
import { addClient, removeClient, emitEvent } from "../../utils/sseEmitter.js";
import { getLocalTime } from "../../utils/timezone.js";
import { sendMail } from "../../services/sendMail.js";

// NEW: resolve template variables
function resolveTemplate(bodyHtml: any, siteData: any) {
  return bodyHtml.replace(/\{\{(\w+)\}\}/g, (match: any, key: any) => {
    return siteData[key] !== undefined ? siteData[key] : "";
  });
}

export const sendMails = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { selectedIds, selectedTemplateId } = req.body;

    if (!selectedIds?.length || !selectedTemplateId) {
      return res.status(400).json({
        success: false,
        message: "websiteIds & templateId required",
      });
    }

    await WebsiteModel.updateMany(
      { _id: { $in: selectedIds } },
      { mailStatus: "pending" },
    );

    sendBulkMails(selectedIds, selectedTemplateId);

    res.json({
      success: true,
      message: "Mail sending started",
    });
  } catch (error) {
    next(error);
  }
};

// NEW: send single mail — short lived, Vercel safe (~2s per request)
export const sendSingleMail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, templateId } = req.body;

    if (!id || !templateId) {
      return res.status(400).json({
        success: false,
        message: "id and templateId are required",
      });
    }

    const template = await TemplateModel.findById(templateId);
    if (!template || !template.active) {
      return res.status(404).json({
        success: false,
        message: "Template not found or inactive",
      });
    }

    // set processing
    await WebsiteModel.findByIdAndUpdate(id, { mailStatus: "processing" });
    emitEvent("status", { id, status: "processing" });

    const site = await WebsiteModel.findById(id);
    if (!site) {
      return res.status(404).json({
        success: false,
        message: "Site not found",
      });
    }

    const subject = resolveTemplate(template.subject, site);
    const body = resolveTemplate(template.bodyHtml, site);

    await sendMail(site.mailId, subject, body);

    // set sent
    await WebsiteModel.findByIdAndUpdate(id, {
      mailStatus: "sent",
      sentAt: getLocalTime(site.country),
      timezone: site.country,
    });

    emitEvent("mail_sent", {
      id,
      name: site.name,
      mail: site.mailId,
      message: `Mail sent to ${site.name} (${site.mailId})`,
    });

    res.json({
      success: true,
      message: `Mail sent to ${site.name}`,
    });
  } catch (error: any) {
    // mark as failed
    await WebsiteModel.findByIdAndUpdate(req.body.id, {
      mailStatus: "failed",
    });
    emitEvent("mail_failed", {
      id: req.body.id,
      message: `Failed to send mail for ${req.body.id}`,
    });
    next(error);
  }
};

// SSE endpoint
export const mailEvents = (req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  addClient(res);

  req.on("close", () => removeClient(res));
};