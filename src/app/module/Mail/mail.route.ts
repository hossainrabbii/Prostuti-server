import { Router } from "express";
import { sendMails, mailEvents } from "./mail.controller.js";

const router = Router();

router.post("/send", sendMails);
router.get("/events", mailEvents);

export const MailRoutes = router;
