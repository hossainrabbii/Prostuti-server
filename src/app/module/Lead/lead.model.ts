import { Schema, model } from "mongoose";
import { ILead } from "./lead.interface.js";

const leadSchema = new Schema<ILead>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: String,
    currentUrl: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
      trim: true,
    },
    remakeUrl: { type: String, required: false },
    mailId: {
      type: String,
      unique: true,
      required: true,
    },
    associateMail: { type: String, required: false },
    majorIssues: { type: String, required: false },
    phone: String,
    country: String,
    city: String,
    mailStatus: {
      type: String,
      enum: ["pending", "processing", "sent", "failed"],
      default: "pending",
    },
    timezone: { type: String, default: null },
    sentAt: { type: Date, default: null },
  },
  { timestamps: true },
);

export const LeadModel = model<ILead>("Lead", leadSchema);