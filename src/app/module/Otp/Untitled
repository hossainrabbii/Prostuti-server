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
    // auto delete when expiresAt is reached
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 },
    },
  },
  { timestamps: true },
);

export const OtpModel = model<IOtp>("Otp", otpSchema);