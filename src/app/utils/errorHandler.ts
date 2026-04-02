import { Request, Response, NextFunction } from "express";

// NEW: global error middleware — handles all error types in one place
export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("Global error caught:", error);

  // MongoDB duplicate key
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0] as string;
    const value = error.keyValue[field];
    return res.status(409).json({
      success: false,
      message: `"${value}" already exists. Please use a different ${field}.`,
    });
  }

  // Mongoose validation error
  if (error.name === "ValidationError") {
    const messages = Object.values(error.errors).map((e: any) => e.message);
    return res.status(400).json({
      success: false,
      message: messages.join(", "),
    });
  }

  // Mongoose bad ObjectId
  if (error.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: `Invalid ${error.path}: ${error.value}`,
    });
  }

  // fallback
  return res.status(500).json({
    success: false,
    message: error.message || "Internal server error",
  });
};
