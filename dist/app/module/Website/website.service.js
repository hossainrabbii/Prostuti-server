import { WebsiteModel } from "./website.model.js";
const createWebsite = async (payload) => {
    console.log(payload);
    const exists = await WebsiteModel.findOne({ mailId: payload.mailId });
    if (exists) {
        throw new Error(`Mail ID "${payload.mailId}" already exists`);
    }
    return WebsiteModel.create(payload);
};
const getAllWebsites = async () => {
    const result = await WebsiteModel.find();
    return result;
};
const getSingleWebsite = async (id) => {
    const result = await WebsiteModel.findById(id);
    return result;
};
const updateWebsite = async (id, payload) => {
    const result = await WebsiteModel.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
};
const deleteWebsite = async (id) => {
    const result = await WebsiteModel.findByIdAndDelete(id);
    return result;
};
export const WebsiteService = {
    createWebsite,
    getAllWebsites,
    getSingleWebsite,
    updateWebsite,
    deleteWebsite,
};
//# sourceMappingURL=website.service.js.map