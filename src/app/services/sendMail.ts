// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";
import appConfig from "../appConfig/index.js";

export const sendMail = async (
  mailFrom: string,
  subjectFor: string,
  body: string,
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: appConfig.enail_user as string,
      pass: appConfig.enail_pass as string,
    },
  });

  await transporter.sendMail({
    from: `"Hossain Rabbi" <${appConfig.enail_user as string}>`,
    to: mailFrom,
    subject: subjectFor,
    html: body,
  });

 
};
