import { Types } from "mongoose";

export interface IEnrollment {
  studentId: Types.ObjectId;       
  courseId: Types.ObjectId;        
  amount: number;                  
  paidNumber: string;             
  transactionId: string;           
  status: "pending" | "approved" | "rejected";
}