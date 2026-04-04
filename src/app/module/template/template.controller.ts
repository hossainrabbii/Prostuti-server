import { Request, Response, NextFunction } from "express";
import { TemplateService } from "./template.service.js";

const getAllTemplates = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await TemplateService.getAllTemplates();
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const getSingleTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await TemplateService.getSingleTemplate(
      req.params.id as string,
    );
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error); // globalErrorHandler sends error.message to frontend
  }
};

const createTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await TemplateService.createTemplate(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const updateTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await TemplateService.updateTemplate(
      req.params.id as string,
      req.body,
    );
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const deleteTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await TemplateService.deleteTemplate(req.params.id as string);
    res.status(200).json({ success: true, message: "Template deleted" });
  } catch (error) {
    next(error);
  }
};

export const TemplateController = {
  getAllTemplates,
  getSingleTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate,
};
