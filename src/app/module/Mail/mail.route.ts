import { Router } from "express";
import { sendMails, mailEvents, sendSingleMail } from "./mail.controller.js";
import { authenticate, authorizeAdmin } from "../../middleware/authenticate.js";

const router = Router();

router.post("/send", authenticate, authorizeAdmin, sendMails);
// NEW: single mail endpoint — short lived, Vercel safe
router.post("/send-single", authenticate, authorizeAdmin, sendSingleMail);
router.get("/events", mailEvents);

export const MailRoutes = router;