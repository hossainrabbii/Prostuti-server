import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "./auth.model.js";
import { ITokenPayload } from "./auth.interface.js";

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

// EDITED: sameSite "none" for cross-domain cookies on Vercel
const refreshCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none" as const, // FIXED: was "strict" — blocked cross-domain
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const generateAccessToken = (payload: ITokenPayload) =>
  jwt.sign(payload, ACCESS_SECRET, { expiresIn: "15m" });

const generateRefreshToken = (payload: ITokenPayload) =>
  jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });

// POST /api/v1/auth/register
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

    // FIXED: removed manual bcrypt.hash — model pre-save hook handles it
    const user = await UserModel.create({ email, password });

    const payload: ITokenPayload = {
      id: user._id as string,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.cookie("refreshToken", refreshToken, refreshCookieOptions);

    res.status(201).json({
      success: true,
      message: "Registered successfully",
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

    res.json({
      success: true,
      accessToken,
    });
  } catch (error) {
    // EDITED: use same options when clearing
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

// POST /api/v1/auth/logout
export const logout = (req: Request, res: Response) => {
  // EDITED: must match same options as when cookie was set
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none", // FIXED: was "strict"
  });
  res.json({ success: true, message: "Logged out successfully" });
};

// GET /api/v1/auth/me
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