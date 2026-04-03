import { Router } from "express";
import { sendMails, mailEvents } from "./mail.controller.js";
const router = Router();
router.post("/send", sendMails);
router.get("/events", mailEvents);
// NEW: named export to match your routes.ts import
export const MailRoutes = router;
//# sourceMappingURL=mail.route.js.map