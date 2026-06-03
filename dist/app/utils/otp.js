import nodemailer from "nodemailer";
export const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
export const sendOTPEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    await transporter.sendMail({
        from: `"MailForge" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your MailForge verification code",
        html: `
      <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto; padding: 32px; background: #fafafa; border-radius: 12px;">
        <h2 style="color: #111; margin-bottom: 8px;">Verify your account</h2>
        <p style="color: #555; margin-bottom: 24px;">Enter this code to verify your MailForge account. It expires in 10 minutes.</p>
        <div style="background: #111; color: #fff; font-size: 32px; font-weight: bold; letter-spacing: 12px; text-align: center; padding: 24px; border-radius: 8px;">
          ${otp}
        </div>
        <p style="color: #999; font-size: 12px; margin-top: 24px;">If you didn't register, ignore this email.</p>
      </div>
    `,
    });
};
export const sendPasswordResetEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    await transporter.sendMail({
        from: `"MailForge" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Reset your MailForge password",
        html: `
      <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto; padding: 32px; background: #fafafa; border-radius: 12px;">
        <h2 style="color: #111; margin-bottom: 8px;">Reset your password</h2>
        <p style="color: #555; margin-bottom: 24px;">Enter this code on the reset password page. It expires in 10 minutes.</p>
        <div style="background: #111; color: #fff; font-size: 32px; font-weight: bold; letter-spacing: 12px; text-align: center; padding: 24px; border-radius: 8px;">
          ${otp}
        </div>
        <p style="color: #999; font-size: 12px; margin-top: 24px;">If you didn't request a password reset, ignore this email.</p>
      </div>
    `,
    });
};
//# sourceMappingURL=otp.js.map