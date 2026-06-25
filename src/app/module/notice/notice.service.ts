import { INotice } from "./notice.interface.js";
import { Notice } from "./notice.model.js";


const createNoticeIntoDB = async (payload: INotice): Promise<INotice> => {
  const result = await Notice.create(payload);
  return result;
};

const getAllNoticesFromDB = async (): Promise<INotice[]> => {
  const result = await Notice.find().sort({ createdAt: -1 });
  return result;
};
const getSingleNoticeFromDB = async (id: string): Promise<INotice | null> => {
  const result = await Notice.findById(id);
  return result;
};

const updateNoticeInDB = async (id: string, payload: Partial<INotice>): Promise<INotice | null> => {
  const result = await Notice.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteNoticeFromDB = async (id: string): Promise<INotice | null> => {
  const result = await Notice.findByIdAndDelete(id);
  return result;
};

export const NoticeServices = {
  createNoticeIntoDB,
  getAllNoticesFromDB,
  getSingleNoticeFromDB,
  updateNoticeInDB,
  deleteNoticeFromDB,
};