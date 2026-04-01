import { sendMail } from "./sendMail.js";
import { TemplateModel } from "../module/template/template.model.js";
import { WebsiteModel } from "../module/Website/website.model.js";
// NEW: import emitEvent to push live updates to frontend
import { emitEvent } from "../utils/sseEmitter.js";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const randomDelay = () => Math.floor(Math.random() * (5 - 1 + 1) + 1) * 60000;

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
    // NEW: notify frontend template is invalid
    emitEvent("error", { message: "Template not found or inactive" });
    console.log("Template not found or inactive");
    return;
  }

  for (let i = 0; i < selectedIds.length; i++) {
    const id = selectedIds[i];

    try {
      await WebsiteModel.findByIdAndUpdate(id, { mailStatus: "processing" });
      // NEW: notify frontend this site is being processed
      emitEvent("status", { id, status: "processing" });

      const site = await WebsiteModel.findById(id);
      if (!site) continue;

      const subject = template.subject;
      const body = resolveTemplate(template.bodyHtml, site);

      await sendMail(site.mailId, subject, body);

      await WebsiteModel.findByIdAndUpdate(id, { mailStatus: "sent" });
      // NEW: notify frontend mail was sent
      emitEvent("mail_sent", {
        id,
        name: site.name,
        mail: site.mailId,
        message: `Mail sent to ${site.name} (${site.mailId})`,
      });

      console.log(`Sent to ${site.mailId}`);
    } catch (error) {
      await WebsiteModel.findByIdAndUpdate(id, { mailStatus: "failed" });
      // NEW: notify frontend mail failed
      emitEvent("mail_failed", {
        id,
        message: `Failed to send mail for ${id}`,
      });
      console.log(`Failed for ${id}`);
    }

    // NEW: if not last mail, emit countdown then wait
    if (i < selectedIds.length - 1) {
      const delayMs = randomDelay();
      const delayMins = Math.round(delayMs / 60000);

      emitEvent("countdown", {
        delayMs,
        delayMins,
        message: `Next mail in ~${delayMins} minute(s)`,
      });

      await delay(delayMs);
    }
  }

  // NEW: all done
  emitEvent("done", { message: "All mails processed!" });
};