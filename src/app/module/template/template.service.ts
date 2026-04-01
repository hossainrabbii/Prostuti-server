import { Types } from "mongoose";
import { ITemplate } from "./template.interface.js";
import { TemplateModel } from "./template.model.js";

const createTemplate = async (payload: ITemplate) => {
  const exists = await TemplateModel.findOne({ name: payload.name });
  console.log(payload);
  if (exists) {
    throw new Error("Template already exists");
  }

  return TemplateModel.create(payload);
};

const getAllTemplates = async () => {
  return TemplateModel.find().sort({ createdAt: -1 });
};

const getSingleTemplate = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID");
  }

  const result = await TemplateModel.findById(id);

  if (!result) {
    throw new Error("Template not found");
  }

  return result;
};

const updateTemplate = async (id: string, payload: Partial<ITemplate>) => {
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

const deleteTemplate = async (id: string) => {
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
