// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";
import { UserModel } from "../module/User/user.model.js";
export const sendMail = async (mailFrom, subjectFor, body, userId) => {
    const user = await UserModel.findById(userId).select("+appPassword");
    if (!user?.appPassword) {
        throw new Error("No app password found. Please add your Gmail app password in settings.");
    }
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: user.email,
            pass: user.appPassword,
        },
    });
    await transporter.sendMail({
        from: `<${user.email}>`,
        to: mailFrom,
        subject: subjectFor,
        html: body,
    });
};
//# sourceMappingURL=sendMail.js.map