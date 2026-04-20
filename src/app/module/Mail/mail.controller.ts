import { Request, Response } from "express";
import { sendBulkMails } from "../../services/mailQueue.service.js";
import { WebsiteModel } from "../Website/website.model.js";
// NEW: import SSE helpers
import { addClient, removeClient } from "../../utils/sseEmitter.js";

export const sendMails = async (req: Request, res: Response) => {
  try {
    const { selectedIds, selectedTemplateId } = req.body;

    if (!selectedIds?.length || !selectedTemplateId) {
      return res.status(400).json({
        success: false,
        message: "Email add & templateId required.",
      });
    }

    // reset status
    await WebsiteModel.updateMany(
      { _id: { $in: selectedIds } },
      { mailStatus: "pending" },
    );

    // background process — don't await, runs in background
    sendBulkMails(selectedIds, selectedTemplateId);
    res.json({
      success: true,
      message: "Mail sending started. Check events for live updates.",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


export const mailEvents = (req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  addClient(res);

  req.on("close", () => removeClient(res));
};
