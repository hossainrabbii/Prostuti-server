import { Types } from "mongoose";

export interface IWebsite {
  _id?: Types.ObjectId;

  name?: string;
  currentUrl: string;
  remakeUrl?: string;

  mailId: string;
  associateMail?: string;

  phone?: string;
  country?: string;
  city?: string;
  timezone?: string;
  mailStatus?: "pending" | "processing" | "sent" | "failed";
  sentAt?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}
