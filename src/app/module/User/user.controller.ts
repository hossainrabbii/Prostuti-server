import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "./user.model.js";
import { OtpModel } from "../Otp/otp.model.js"; // NEW
import { ITokenPayload } from "./user.interface.js";
import appConfig from "../../appConfig/index.js";
import { generateOTP, sendOTPEmail } from "../../utils/otp.js"; // NEW
import nodemailer from "nodemailer";
const ACCESS_SECRET = appConfig.accessTokenSecret as string;
const REFRESH_SECRET = appConfig.refreshTokenSecret as string;

const refreshCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const generateAccessToken = (payload: ITokenPayload) =>
  jwt.sign(payload, ACCESS_SECRET, { expiresIn: "2h" });

const generateRefreshToken = (payload: ITokenPayload) =>
  jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });

// YOUR EXISTING register — only added OTP sending + isVerified + no tokens
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const existing = await UserModel.findOne({ email });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // EDITED: add isVerified: false
    const user = await UserModel.create({
      email,
      password: hashedPassword,
      isVerified: false,
    });

    // NEW: generate OTP → save to otps collection → send email
    const otp = generateOTP();
    await OtpModel.create({
      userId: user._id,
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 mins
    });
    await sendOTPEmail(email, otp);

    // EDITED: no tokens on register — frontend redirects to verify-otp
    res.status(201).json({
      success: true,
      message: "Registered successfully. Check your email for the OTP.",
      userId: user._id, // NEW: needed for verify-otp page
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

// NEW: POST /api/v1/auth/verify-otp
export const verifyOTP = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res.status(400).json({
        success: false,
        message: "userId and otp are required",
      });
    }

    const otpDoc = await OtpModel.findOne({ userId });

    if (!otpDoc) {
      return res.status(400).json({
        success: false,
        message: "OTP expired or not found. Please request a new one.",
      });
    }

    if (otpDoc.expiresAt < new Date()) {
      await OtpModel.deleteOne({ userId });
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }

    if (otpDoc.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // mark user as verified
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { isVerified: true },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // delete OTP after successful verification
    await OtpModel.deleteOne({ userId });

    // auto login — generate tokens
    const payload: ITokenPayload = {
      id: user._id as string,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.cookie("refreshToken", refreshToken, refreshCookieOptions);

    res.json({
      success: true,
      message: "Account verified successfully",
      accessToken,
      data: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// NEW: POST /api/v1/auth/resend-otp
export const resendOTP = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Account already verified",
      });
    }

    // delete old OTP + create new one
    await OtpModel.deleteOne({ userId });
    const otp = generateOTP();
    await OtpModel.create({
      userId,
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });
    await sendOTPEmail(user.email, otp);

    res.json({
      success: true,
      message: "New OTP sent to your email",
    });
  } catch (error) {
    next(error);
  }
};

// YOUR EXISTING login — only added isVerified block
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // NEW: block unverified users — send fresh OTP
    if (!user.isVerified) {
      await OtpModel.deleteOne({ userId: user._id });
      const otp = generateOTP();
      await OtpModel.create({
        userId: user._id,
        otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      });
      await sendOTPEmail(user.email, otp);

      return res.status(403).json({
        success: false,
        message: "Please verify your email first. A new OTP has been sent.",
        userId: user._id,
        requiresVerification: true,
      });
    }

    const payload: ITokenPayload = {
      id: user._id as string,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.cookie("refreshToken", refreshToken, refreshCookieOptions);

    res.json({
      success: true,
      message: "Login successful",
      accessToken,
      data: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// YOUR EXISTING refresh — unchanged
export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.refreshToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No refresh token",
      });
    }

    const decoded = jwt.verify(token, REFRESH_SECRET) as ITokenPayload;

    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists",
      });
    }

    const payload: ITokenPayload = {
      id: user._id as string,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.cookie("refreshToken", refreshToken, refreshCookieOptions);

    res.json({ success: true, accessToken });
  } catch (error) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(401).json({
      success: false,
      message: "Session expired. Please login again.",
    });
  }
};

// YOUR EXISTING logout — unchanged
export const logout = (req: Request, res: Response) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.json({ success: true, message: "Logged out successfully" });
};

// YOUR EXISTING getMe — unchanged
export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await UserModel.findById(req.user?.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};


// NEW: POST /api/v1/auth/mail-config
export const saveMailConfig = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { appPassword } = req.body;
    const userId = req.user?.id;

    if (!appPassword) {
      return res.status(400).json({
        success: false,
        message: "App password is required",
      });
    }

    // get user email to verify against
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // verify app password belongs to user's registered email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: user.email, // use their registered email
        pass: appPassword,
      },
    });

    try {
      await transporter.verify();
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid app password for your email. Please check and try again.",
      });
    }

    // save verified app password
    await UserModel.findByIdAndUpdate(userId, { appPassword });

    res.json({
      success: true,
      message: "App password verified and saved successfully",
    });
  } catch (error) {
    next(error);
  }
};

// NEW: GET /api/v1/auth/mail-config
export const getMailConfig = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await UserModel.findById(req.user?.id);
    
    res.json({
      success: true,
      data: {
        email:user?.email,
        isVerified:user?.isVerified,
        role:user?.role,
        appPassword:user?.appPassword,
      }
    });
  } catch (error) {
    next(error);
  }
};