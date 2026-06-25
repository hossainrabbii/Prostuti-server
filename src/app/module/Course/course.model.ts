import { Schema, model } from "mongoose";
import { ICourse } from "./course.interface.js";

// পেমেন্ট মেথডের জন্য সাব-স্কিমা (Sub-schema)
const paymentMethodSchema = new Schema(
  {
    name: { 
      type: String, 
      required: true, 
      enum: ["Bkash", "Nagad", "Upay", "Rocket"], // ফ্রন্টএন্ডের সিলেক্ট অপশনের সাথে মিল রেখে
      trim: true 
    },
    number: { 
      type: String, 
      required: true, 
      trim: true 
    }
  },
  { _id: false } 
);

const courseSchema = new Schema<ICourse>(
  {
    name: { type: String, required: true, trim: true },
    length: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, default: null },
    description: { type: String, trim: true },
    
    // 🚀 এখানে পেমেন্ট মেথড সাব-স্কিমা অ্যারে যুক্ত করা হলো
    paymentMethods: { 
      type: [paymentMethodSchema], 
      default: [] 
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Course = model<ICourse>("Course", courseSchema);