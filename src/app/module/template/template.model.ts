import { Schema, model } from "mongoose";
import { ITemplate } from "./template.interface.js";

const templateSchema = new Schema<ITemplate>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    bodyHtml: {
      type: String,
      required: true,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const TemplateModel = model<ITemplate>("Template", templateSchema);