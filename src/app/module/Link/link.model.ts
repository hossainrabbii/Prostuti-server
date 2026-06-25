import { Schema, model } from 'mongoose';
import { ILinks, LinksModel } from './link.interface.js';

const linksSchema = new Schema<ILinks, LinksModel>(
  {
    liveUrl: {
      type: String,
      trim: true,
      default: "",
    },
    examUrl: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true, // এটি অটোমেটিক updatedAt ট্র্যাক রাখবে
    versionKey: false,
  }
);

export const Links = model<ILinks, LinksModel>('Links', linksSchema);