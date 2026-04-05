import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "./auth.model.js";
import { ITokenPayload } from "./auth.interface.js";

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

// refreshToken goes in httpOnly cookie
const refreshCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const generateAccessToken = (payload: ITokenPayload) =>
  jwt.sign(payload, ACCESS_SECRET, { expiresIn: "15m" });

const generateRefreshToken = (payload: ITokenPayload) =>
  jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });

// POST /api/v1/auth/register
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

    const hashedPass = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ email, password: hashedPass });

    const payload: ITokenPayload = {
      id: user._id as string,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // NEW: set tokens on register same as login
    res.cookie("refreshToken", refreshToken, refreshCookieOptions);

    res.status(201).json({
      success: true,
      message: "Registered successfully",
      accessToken, // frontend saves to localStorage
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

    // refreshToken → httpOnly cookie (JS cannot read)
    res.cookie("refreshToken", refreshToken, refreshCookieOptions);

    // accessToken → sent in response body → frontend saves in localStorage
    res.json({
      success: true,
      message: "Login successful",
      accessToken, // frontend saves this
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

    // get fresh user — picks up any role changes from DB
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

    // rotate refreshToken — set new cookie
    res.cookie("refreshToken", refreshToken, refreshCookieOptions);

    // send new accessToken to frontend
    res.json({
      success: true,
      accessToken, // frontend updates localStorage
    });
  } catch (error) {
    res.clearCookie("refreshToken");
    return res.status(401).json({
      success: false,
      message: "Session expired. Please login again.",
    });
  }
};

// POST /api/v1/auth/logout
export const logout = (req: Request, res: Response) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
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
