// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";
import appConfig from "../appConfig/index.js";

export const sendMail = async (
  mailFrom: string,
  subjectFor: string,
  body: string,
) => {
  // Create a test account or replace with real credentials.
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // REQUIRED
    auth: {
      user: appConfig.enail_user as string,
      pass: appConfig.enail_pass as string,
    },
  });

  // Wrap in an async IIFE so we can use await.
  await transporter.sendMail({
    from: `"Hossain Rabbi" <${appConfig.enail_user as string}>`,
    to: mailFrom,
    subject: subjectFor,
    html: body,
  });

  // console.log("Message sent:", info.messageId)
};
