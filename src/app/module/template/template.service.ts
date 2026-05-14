import { Types } from "mongoose";
import { ITemplate } from "./template.interface.js";
import { TemplateModel } from "./template.model.js";

const createTemplate = async (payload: ITemplate) => {
  const exists = await TemplateModel.findOne({
    name: payload.name,
    userId: payload.userId,
  });
  if (exists) {
    throw new Error("Template name already exists.");
  }

  return TemplateModel.create(payload);
};

const getAllTemplates = async (userId: string) => {
  return TemplateModel.find({ userId }).sort({ createdAt: -1 });
};

const getSingleTemplate = async (id: string, userId: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID");
  }

  const result = await TemplateModel.findOne({ _id: id, userId });

  if (!result) {
    throw new Error("Template not found");
  }

  return result;
};

const updateTemplate = async (
  id: string,
  userId: string,
  payload: Partial<ITemplate>,
) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID");
  }

  const { userId: _ignored, ...safe } = payload;

  const result = await TemplateModel.findOneAndUpdate(
    { _id: id, userId },
    safe,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!result) {
    throw new Error("Template not found");
  }

  return result;
};

const deleteTemplate = async (id: string, userId: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID");
  }

  const result = await TemplateModel.findOneAndDelete({ _id: id, userId });

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
