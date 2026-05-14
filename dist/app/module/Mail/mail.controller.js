import { sendBulkMails } from "../../services/mailQueue.service.js";
import { LeadModel } from "../Lead/lead.model.js";
// NEW: import SSE helpers
import { addClient, removeClient } from "../../utils/sseEmitter.js";
export const sendMails = async (req, res) => {
    try {
        const { selectedIds, selectedTemplateId } = req.body;
        if (!selectedIds?.length || !selectedTemplateId) {
            return res.status(400).json({
                success: false,
                message: "Email add & templateId required.",
            });
        }
        if (!req.user?.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized — please login",
            });
        }
        const userId = req.user.id;
        // reset status — only this user's leads
        await LeadModel.updateMany({ _id: { $in: selectedIds }, userId }, { mailStatus: "pending" });
        // background process — don't await, runs in background
        sendBulkMails(selectedIds, selectedTemplateId);
        res.json({
            success: true,
            message: "Mail sending started. Check events for live updates.",
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
export const mailEvents = (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();
    addClient(res);
    req.on("close", () => removeClient(res));
};
//# sourceMappingURL=mail.controller.js.map