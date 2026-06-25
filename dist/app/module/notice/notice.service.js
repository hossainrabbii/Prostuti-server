import { Notice } from "./notice.model.js";
const createNoticeIntoDB = async (payload) => {
    const result = await Notice.create(payload);
    return result;
};
const getAllNoticesFromDB = async () => {
    const result = await Notice.find().sort({ createdAt: -1 });
    return result;
};
const getSingleNoticeFromDB = async (id) => {
    const result = await Notice.findById(id);
    return result;
};
const updateNoticeInDB = async (id, payload) => {
    const result = await Notice.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
};
const deleteNoticeFromDB = async (id) => {
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
//# sourceMappingURL=notice.service.js.map