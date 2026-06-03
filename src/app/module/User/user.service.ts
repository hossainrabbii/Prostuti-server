import bcrypt from "bcryptjs";
import { UserModel } from "./user.model.js";
import { OtpModel } from "../Otp/otp.model.js";
import { ILoginPayload } from "./user.interface.js";
import { generateOTP, sendOTPEmail } from "../../utils/otp.js";
import type { OtpPurpose } from "../Otp/otp.interface.js";

const OTP_VERIFICATION: OtpPurpose = "verification";

export const AuthService = {
  // EDITED: register creates user + sends OTP, no tokens yet
  register: async (email: string, password: string) => {
    const existing = await UserModel.findOne({ email });
    if (existing) {
      throw new Error("Email already registered");
    }

    const user = await UserModel.create({
      email,
      password,
      isVerified: false,
    });

    // NEW: generate OTP and save to separate collection
    const otp = generateOTP();
    await OtpModel.create({
      userId: user._id,
      otp,
      purpose: OTP_VERIFICATION,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 mins
    });

    // NEW: send OTP email
    await sendOTPEmail(email, otp);

    return {
      userId: user._id,
      email: user.email,
    };
  },

  // NEW: verify OTP
  verifyOTP: async (userId: string, otp: string) => {
    const otpDoc = await OtpModel.findOne({
      userId,
      purpose: OTP_VERIFICATION,
    });

    if (!otpDoc) {
      throw new Error("OTP expired or not found. Please request a new one.");
    }

    if (otpDoc.expiresAt < new Date()) {
      await OtpModel.deleteOne({ userId, purpose: OTP_VERIFICATION });
      throw new Error("OTP has expired. Please request a new one.");
    }

    if (otpDoc.otp !== otp) {
      throw new Error("Invalid OTP");
    }

    // mark verified
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { isVerified: true },
      { new: true },
    );

    if (!user) throw new Error("User not found");

    // delete OTP after successful verification
    await OtpModel.deleteOne({ userId, purpose: OTP_VERIFICATION });

    return {
      id: user._id as string,
      email: user.email,
      role: user.role,
      isVerified: true,
    };
  },

  // NEW: resend OTP
  resendOTP: async (userId: string) => {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error("User not found");
    if (user.isVerified) throw new Error("Account already verified");

    // delete old OTP if exists
    await OtpModel.deleteOne({ userId, purpose: OTP_VERIFICATION });

    const otp = generateOTP();
    await OtpModel.create({
      userId,
      otp,
      purpose: OTP_VERIFICATION,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    await sendOTPEmail(user.email, otp);

    return { email: user.email };
  },

  // EDITED: login blocks unverified users
  login: async ({ email, password }: ILoginPayload) => {
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    // NEW: block unverified — send fresh OTP
    if (!user.isVerified) {
      await OtpModel.deleteOne({
        userId: user._id,
        purpose: OTP_VERIFICATION,
      });
      const otp = generateOTP();
      await OtpModel.create({
        userId: user._id,
        otp,
        purpose: OTP_VERIFICATION,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      });
      await sendOTPEmail(user.email, otp);

      // throw special error with userId so controller can return it
      const error: any = new Error(
        "Please verify your email first. A new OTP has been sent.",
      );
      error.requiresVerification = true;
      error.userId = user._id;
      throw error;
    }

    return {
      id: user._id as string,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    };
  },

  getById: async (id: string) => {
    const user = await UserModel.findById(id);
    if (!user) throw new Error("User not found");
    return {
      id: user._id,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    };
  },

  getRefreshUser: async (id: string) => {
    const user = await UserModel.findById(id);
    if (!user) throw new Error("User no longer exists");
    return {
      id: user._id as string,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    };
  },
};