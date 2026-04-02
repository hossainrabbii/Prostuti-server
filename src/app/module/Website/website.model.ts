import { Schema, model } from "mongoose";
import { IWebsite } from "./website.interface.js";

const websiteSchema = new Schema<IWebsite>(
  {
    name: String,

    currentUrl: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    remakeUrl: String,

    mailId: {
      type: String,
      required: true,
    },

    associateMail: {
      type: String,
      required: false,
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
