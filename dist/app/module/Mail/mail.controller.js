import { sendBulkMails } from "../../services/mailQueue.service.js";
import { WebsiteModel } from "../Website/website.model.js";
// NEW: import SSE helpers
import { addClient, removeClient } from "../../utils/sseEmitter.js";
export const sendMails = async (req, res) => {
    try {
        const { selectedIds, selectedTemplateId } = req.body;
        if (!selectedIds?.length || !selectedTemplateId) {
            return res.status(400).json({
                success: false,
                message: "websiteIds & templateId required",
            });
        }
        // reset status
        await WebsiteModel.updateMany({ _id: { $in: selectedIds } }, { mailStatus: "pending" });
        // background process — don't await, runs in background
        sendBulkMails(selectedIds, selectedTemplateId);
        res.json({
            success: true,
            message: "Mail sending started",
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
// NEW: SSE endpoint — frontend connects here to receive live events
export const mailEvents = (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();
    addClient(res);
    // remove client when browser disconnects
    req.on("close", () => removeClient(res));
};
//# sourceMappingURL=mail.controller.js.map