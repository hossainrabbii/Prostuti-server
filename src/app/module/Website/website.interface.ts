import { Types } from "mongoose";

export interface IWebsite {
  _id?: Types.ObjectId;

  name?: string;
  currentUrl: string;
  remakeUrl?: string;

  mailId: string;
  associateMail: string;

  phone?: string;
  country?: string;
  city?: string;

  mailStatus?: "pending" | "processing" | "sent" | "failed";

  createdAt?: Date;
  updatedAt?: Date;
}