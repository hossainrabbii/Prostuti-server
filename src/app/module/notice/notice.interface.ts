import { Model } from 'mongoose';

export interface INotice {
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type NoticeModel = Model<INotice, Record<string, never>>;