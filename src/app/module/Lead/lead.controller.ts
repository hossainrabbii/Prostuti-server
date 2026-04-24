import { NextFunction, Request, Response } from "express";
import { LeadService } from "./lead.service.js";

export const createLead = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const Lead = await LeadService.createLead(req.body);
    res.status(201).json({
      success: true,
      message: "Lead added successfully.",
      data: Lead,
    });
  } catch (error) {
    next(error);
  }
};

const getAllLeads = async (
  _req: Request,
  res: Response,
  next: NextFunction, 
) => {
  try {
    const result = await LeadService.getAllLeads();

    console.log(result);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleLead = async (
  req: Request,
  res: Response,
  next: NextFunction, 
) => {
  try {
    const result = await LeadService.getSingleLead(
      req.params.id as string,
    );
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateLead = async (
  req: Request,
  res: Response,
  next: NextFunction, 
) => {
  try {
    const id = req.params.id as string;
    const result = await LeadService.updateLead(id, req.body);
    res.status(200).json({
      success: true,
      message: "Lead updated successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteLead = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await LeadService.deleteLead(req.params.id as string);
    res.status(200).json({
      success: true,
      message: "Lead deleted successfully.",
    });
  } catch (error) {
    next(error); 
  }
};

export const LeadController = {
  createLead,
  getAllLeads,
  getSingleLead,
  updateLead,
  deleteLead,
};
