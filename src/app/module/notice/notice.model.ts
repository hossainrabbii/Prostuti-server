import { Schema, model } from 'mongoose';
import { INotice, NoticeModel } from './notice.interface.js';

const noticeSchema = new Schema<INotice, NoticeModel>(
  {
    title: {
      type: String,
      required: [true, 'নোটিশের শিরোনাম আবশ্যক'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'নোটিশের বিস্তারিত বিবরণ আবশ্যক'],
      trim: true,
    },
  },
  {
    timestamps: true, 
    versionKey: false,
  }
);

export const Notice = model<INotice, NoticeModel>('Notice', noticeSchema);