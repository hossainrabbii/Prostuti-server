import { Schema, model } from "mongoose";
import { IUser } from "./user.interface.js";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
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
    facebook: {
      type: String,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    
    isActive: {
      type: Boolean,
      default: false,
    },    
    appPassword: {
      type: String,
      default: null,
      
    },
  },
  { timestamps: true },
);

export const UserModel = model<IUser>("User", userSchema);