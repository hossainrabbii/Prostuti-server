import { ICourse } from "./course.interface.js";
import { Course } from "./course.model.js";

const createCourseIntoDB = async (payload: ICourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async () => {
  const result = await Course.find().sort({ createdAt: -1 });
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id);
  return result;
};

const updateCourseInDB = async (id: string, payload: Partial<ICourse>) => {
  const result = await Course.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndDelete(id);
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseInDB,
  deleteCourseFromDB,
};