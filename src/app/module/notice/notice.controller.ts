import { Request, Response } from 'express';
import { NoticeServices } from './notice.service.js';
import { StringDecoder } from 'string_decoder';

// ১. ক্রিয়েট কন্ট্রোলার
const createNotice = async (req: Request, res: Response) => {
  try {
    const result = await NoticeServices.createNoticeIntoDB(req.body);
    res.status(201).json({
      success: true,
      message: 'Notice created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Something went wrong!' });
  }
};

// ২. গেট অল কন্ট্রোলার
const getAllNotices = async (req: Request, res: Response) => {
  try {
    const result = await NoticeServices.getAllNoticesFromDB();
    res.status(200).json({
      success: true,
      message: 'Notices fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Something went wrong!' });
  }
};

// ৩. গেট সিঙ্গেল কন্ট্রোলার
const getSingleNotice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await NoticeServices.getSingleNoticeFromDB(id as string);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Notice not found!' });
    }
    res.status(200).json({
      success: true,
      message: 'Notice fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Something went wrong!' });
  }
};

// ৪. আপডেট কন্ট্রোলার
const updateNotice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await NoticeServices.updateNoticeInDB(id as string, req.body);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Notice not found to update!' });
    }
    res.status(200).json({
      success: true,
      message: 'Notice updated successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Something went wrong!' });
  }
};

// ৫. ডিলিট কন্ট্রোলার
const deleteNotice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await NoticeServices.deleteNoticeFromDB(id as string);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Notice not found to delete!' });
    }
    res.status(200).json({
      success: true,
      message: 'Notice deleted successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Something went wrong!' });
  }
};

export const NoticeControllers = {
  createNotice,
  getAllNotices,
  getSingleNotice,
  updateNotice,
  deleteNotice,
};