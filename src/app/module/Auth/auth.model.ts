import { Schema, model } from "mongoose";
import { IUser } from "./auth.interface.js";

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    // NEW
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const UserModel = model<IUser>("User", userSchema);