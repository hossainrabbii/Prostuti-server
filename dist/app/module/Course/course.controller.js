import { CourseServices } from "./course.service.js";
const createCourse = async (req, res) => {
    try {
        const result = await CourseServices.createCourseIntoDB(req.body);
        res.status(201).json({
            success: true,
            message: "কোর্সটি সফলভাবে তৈরি হয়েছে!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const getAllCourses = async (req, res) => {
    try {
        const result = await CourseServices.getAllCoursesFromDB();
        res.status(200).json({
            success: true,
            message: "সবগুলো কোর্স সফলভাবে আনা হয়েছে!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const getSingleCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await CourseServices.getSingleCourseFromDB(id);
        if (!result) {
            return res.status(404).json({ success: false, message: "কোর্সটি পাওয়া যায়নি!" });
        }
        res.status(200).json({
            success: true,
            message: "কোর্সের তথ্য সফলভাবে আনা হয়েছে!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await CourseServices.updateCourseInDB(id, req.body);
        res.status(200).json({
            success: true,
            message: "কোর্সের তথ্য সফলভাবে আপডেট করা হয়েছে!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        await CourseServices.deleteCourseFromDB(id);
        res.status(200).json({
            success: true,
            message: "কোর্সটি সফলভাবে মুছে ফেলা হয়েছে!",
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export const CourseControllers = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    updateCourse,
    deleteCourse,
};
//# sourceMappingURL=course.controller.js.map