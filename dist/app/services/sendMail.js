// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";
import appConfig from "../appConfig/index.js";
export const sendMail = async (mailFrom, subjectFor, body) => {
    // Create a test account or replace with real credentials.
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // REQUIRED
        auth: {
            user: appConfig.enail_user,
            pass: appConfig.enail_pass,
        },
    });
    // Wrap in an async IIFE so we can use await.
    await transporter.sendMail({
        from: `"Hossain Rabbi" <${appConfig.enail_user}>`,
        to: mailFrom,
        subject: subjectFor,
        html: body,
    });
    // console.log("Message sent:", info.messageId)
};
//# sourceMappingURL=sendMail.js.map