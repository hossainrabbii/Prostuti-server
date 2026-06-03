import { Schema, model } from "mongoose";
import { IOtp } from "./otp.interface.js";

const otpSchema = new Schema<IOtp>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      enum: ["verification", "password_reset"],
      default: "verification",
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 },
    },
  },
  { timestamps: true },
);

otpSchema.index({ userId: 1, purpose: 1 }, { unique: true });

export const OtpModel = model<IOtp>("Otp", otpSchema);
