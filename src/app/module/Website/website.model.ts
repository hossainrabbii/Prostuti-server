import { Schema, model } from "mongoose";
import { IWebsite } from "./website.interface.js";

const websiteSchema = new Schema<IWebsite>(
  {
    name: String,

    currentUrl: {
      type: String,
      unique: true,
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

export const WebsiteModel = model<IWebsite>("Website", websiteSchema);
