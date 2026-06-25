import { Request, Response } from "express";
import { EnrollmentServices } from "./enrollment.service.js";

const createEnrollment = async (req: Request, res: Response) => {
  try {
    const result = await EnrollmentServices.createEnrollmentIntoDB(req.body);
    res.status(201).json({
      success: true,
      message: "আপনার পেমেন্ট রিকোয়েস্টটি পেন্ডিং অবস্থায় রয়েছে। ভেরিফিকেশনের পর একটিভ হবে।",
      data: result,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "এই Transaction ID টি ইতিমধ্যে ব্যবহার করা হয়েছে!" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

const getStudentEnrollments = async (req: Request, res: Response) => {
    try {
      const { studentId } = req.params;
      const result = await EnrollmentServices.getStudentEnrollmentsFromDB(studentId as string);
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  const getAllEnrollments = async (req: Request, res: Response) => {
    try {
      const result = await EnrollmentServices.getAllEnrollmentsFromDB();
      res.status(200).json({ success: true, message: "All enrollments fetched for admin", data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

const updateStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body; 
    const result = await EnrollmentServices.updateEnrollmentStatusInDB(id as string, status);
    res.status(200).json({ success: true, message: `Enrollment status ${status} successfully`, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const EnrollmentControllers = {
  createEnrollment,
  getStudentEnrollments,
  getAllEnrollments,
  updateStatus,
};