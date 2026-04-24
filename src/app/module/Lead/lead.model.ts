import { Schema, model } from "mongoose";
import { ILead } from "./lead.interface.js";

const LeadSchema = new Schema<ILead>(
  {
    name: String,
    currentUrl: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      set: (v: string) => (v === "" ? undefined : v),
    },
    remakeUrl: { type: String, required: false },

    mailId: {
      type: String,
      unique: true,
      required: true,
    },

    associateMail: {
      type: String,
      required: false,
    },

    majorIssues: {
      type: String,
      required: true,
    },

    phone: String,
    country: String,
    city: String,

    mailStatus: {
      type: String,
      enum: ["pending", "processing", "sent", "failed"],
      default: "pending",
    },
    timezone: {
      type: String,
      default: null,
    },

    sentAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const LeadModel = model<ILead>("Lead", LeadSchema);
