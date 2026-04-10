import { Types } from "mongoose";
import { TemplateModel } from "./template.model.js";
const createTemplate = async (payload) => {
    const exists = await TemplateModel.findOne({ name: payload.name });
    if (exists) {
        return {
            success: false,
            message: "Template name is already exists.",
        };
    }
    return TemplateModel.create(payload);
};
const getAllTemplates = async () => {
    return TemplateModel.find().sort({ createdAt: -1 });
};
const getSingleTemplate = async (id) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ID");
    }
    const result = await TemplateModel.findById(id);
    if (!result) {
        throw new Error("Template not found");
    }
    return result;
};
const updateTemplate = async (id, payload) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ID");
    }
    const result = await TemplateModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new Error("Template not found");
    }
    return result;
};
const deleteTemplate = async (id) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ID");
    }
    const result = await TemplateModel.findByIdAndDelete(id);
    if (!result) {
        throw new Error("Template not found");
    }
    return result;
};
export const TemplateService = {
    createTemplate,
    getAllTemplates,
    getSingleTemplate,
    updateTemplate,
    deleteTemplate,
};
//# sourceMappingURL=template.service.js.map