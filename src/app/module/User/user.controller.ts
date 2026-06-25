import { Request, Response } from "express";
import { userServices } from "./user.service.js";

const registerUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.registerUser(req.body);

    return res.status(201).json({
      success: true,
      statusCode: 201,
      message: "রেজিস্ট্রেশন সফল হয়েছে, লগইন করে ডেসবোর্ডে প্রবেশ করুন!",
      data: result, 
    });
    
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message || "রেজিস্ট্রেশন করতে সমস্যা হয়েছে।",
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.loginUser(req.body);

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "লগইন সফল হয়েছে!",
      data: result,
    });
    
  } catch (error: any) {
    return res.status(401).json({ 
      success: false,
      statusCode: 401,
      message: error.message || "লগইন করতে ব্যর্থ হয়েছে।",
    });
  }
};


export const userControllers = {
  registerUser,
  loginUser
};