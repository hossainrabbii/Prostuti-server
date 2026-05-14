import { Router } from "express";
import { sendMails, mailEvents } from "./mail.controller.js";
import { authenticate } from "../../middleware/authenticate.js";

const router = Router();

router.post("/send", authenticate, sendMails);
router.get("/events", mailEvents);

export const MailRoutes = router;
