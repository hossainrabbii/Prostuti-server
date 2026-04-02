import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "./auth.model.js";
import { ITokenPayload } from "./auth.interface.js";

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
};

const generateAccessToken = (payload: ITokenPayload) =>
  jwt.sign(payload, ACCESS_SECRET, { expiresIn: "15m" });

const generateRefreshToken = (payload: ITokenPayload) =>
  jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });

const setTokenCookies = (res: Response, payload: ITokenPayload) => {
  res.cookie("accessToken", generateAccessToken(payload), {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", generateRefreshToken(payload), {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

// POST /api/v1/auth/register
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(req.body);
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

    const hashedPass = bcrypt.hashSync(password, 10);

    const user = await UserModel.create({ email, password: hashedPass });

    // NEW: never send password in response
    res.status(201).json({
      success: true,
      message: "Registered successfully",
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

// POST /api/v1/auth/login
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

    // NEW: explicitly select password only here for comparison
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

    const payload: ITokenPayload = {
      id: user._id as string,
      email: user.email,
      role: user.role,
    };

    setTokenCookies(res, payload);

    // NEW: never send password in response
    res.json({
      success: true,
      message: "Login successful",
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

// POST /api/v1/auth/refresh
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

    // password not needed here — no select("+password")
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

    setTokenCookies(res, payload);

    res.json({ success: true, message: "Token refreshed" });
  } catch (error) {
    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token. Please login again.",
    });
  }
};

// POST /api/v1/auth/logout
export const logout = (req: Request, res: Response) => {
  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);
  res.json({ success: true, message: "Logged out successfully" });
};

// GET /api/v1/auth/me
export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // password is excluded by default because of select: false in model
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
