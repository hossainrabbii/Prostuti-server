import { Types } from "mongoose";

export type OtpPurpose = "verification" | "password_reset";

export interface IOtp {
  userId: Types.ObjectId | string;
  otp: string;
  purpose: OtpPurpose;
  expiresAt: Date;
  createdAt?: Date;
}
