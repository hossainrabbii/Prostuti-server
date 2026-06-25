import { Enrollment } from "./enrollment.model.js";
const createEnrollmentIntoDB = async (payload) => {
    const result = await Enrollment.create(payload);
    return result;
};
// ১. স্টুডেন্টের নিজের এনরোলমেন্ট হিস্ট্রি (এখানে শুধু courseId পপ্যুলেট করলেই হচ্ছে)
const getStudentEnrollmentsFromDB = async (studentId) => {
    const result = await Enrollment.find({ studentId })
        .populate("courseId")
        .sort({ createdAt: -1 });
    return result;
};
const getAllEnrollmentsFromDB = async () => {
    const result = await Enrollment.find()
        .populate("studentId")
        .populate("courseId")
        .sort({ createdAt: -1 });
    return result;
};
const updateEnrollmentStatusInDB = async (id, status) => {
    const result = await Enrollment.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
    return result;
};
export const EnrollmentServices = {
    createEnrollmentIntoDB,
    getStudentEnrollmentsFromDB,
    getAllEnrollmentsFromDB,
    updateEnrollmentStatusInDB,
};
//# sourceMappingURL=enrollment.service.js.map