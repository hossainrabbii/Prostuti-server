// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";
import appConfig from "../appConfig/index.js";
export const sendMail = async (mailFrom, subjectFor, body) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: appConfig.enail_user,
            pass: appConfig.enail_pass,
        },
    });
    await transporter.sendMail({
        from: `"Hossain Rabbi" <${appConfig.enail_user}>`,
        to: mailFrom,
        subject: subjectFor,
        html: body,
    });
};
//# sourceMappingURL=sendMail.js.map