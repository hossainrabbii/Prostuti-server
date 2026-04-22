import { sendMail } from "./sendMail.js";
import { TemplateModel } from "../module/template/template.model.js";
import { WebsiteModel } from "../module/Website/website.model.js";
import { emitEvent } from "../utils/sseEmitter.js";
import { getLocalTime } from "../utils/timezone.js";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const randomDelay = () => {
  const seconds = Math.floor(Math.random() * (90 - 30 + 1)) + 30;
  console.log(`Waiting ${seconds} seconds before next mail...`);
  return seconds * 1000;
};

function resolveTemplate(bodyHtml: any, siteData: any) {
  const variables = [...bodyHtml.matchAll(/\{\{(\w+)\}\}/g)].map((m) => m[1]);
  console.log("Found variables:", variables);

  const resolved = bodyHtml.replace(
    /\{\{(\w+)\}\}/g,
    (match: any, key: any) => {
      return siteData[key] !== undefined ? siteData[key] : "";
    },
  );

  return resolved;
}

export const sendBulkMails = async (
  selectedIds: string[],
  selectedTemplateId: string,
) => {
  const template = await TemplateModel.findById(selectedTemplateId);

  if (!template || !template.active) {
    emitEvent("error", { message: "Template not found or inactive" });
    return;
  }

  for (let i = 0; i < selectedIds.length; i++) {
    const id = selectedIds[i];

    try {
      await WebsiteModel.findByIdAndUpdate(id, { mailStatus: "processing" });
      emitEvent("status", { id, status: "processing" });

      const site = await WebsiteModel.findById(id);
      if (!site) continue;

      const subject = template.subject;
      const body = resolveTemplate(template.bodyHtml, site);

      await sendMail(site.mailId, subject, body);

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

    } catch (error) {
      await WebsiteModel.findByIdAndUpdate(id, { mailStatus: "failed" });
      emitEvent("mail_failed", {
        id,
        message: `Failed to send mail for ${id}`,
      });
    }

    if (i < selectedIds.length - 1) {
      const delayMs = randomDelay(); 
      const delayMins = Math.round(delayMs / 1000);

      emitEvent("countdown", {
        delayMs,
        delayMins,
        message: `Next mail in ~${delayMins} minute(s)`,
      });

      await delay(delayMs);
    }
  }

  emitEvent("done", { message: "All mails processed!" });
};