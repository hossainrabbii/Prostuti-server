// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";
import appConfig from "../appConfig/index.js";
import { UserModel } from "../module/User/user.model.js";

export const sendMail = async (
  mailFrom: string,
  subjectFor: string,
  body: string,
  userId:string
) => {
  const user = await UserModel.findById(userId).select("+appPassword");

  if (!user?.appPassword) {
    throw new Error(
      "No app password found. Please add your Gmail app password in settings.",
    );
  }
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: user.email as string,
      pass: user.appPassword as string,
    },
  });

  await transporter.sendMail({
    from: `<${user.email as string}>`,
    to: mailFrom,
    subject: subjectFor,
    html: body,
  });


};
