import { NextFunction, Request, Response } from "express";
import { LeadService } from "./lead.service.js";

export const createLead = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // NEW: userId comes from JWT token via authenticate middleware
    // req.user is set by authenticate middleware after verifying JWT
    const payload = {
      ...req.body,
      userId: req.user?.id,
    };

    const lead = await LeadService.createLead(payload);
    res.status(201).json({
      success: true,
      message: "Lead added successfully.",
      data: lead,
    });
  } catch (error) {
    next(error);
  }
};

const getAllLeads = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // NEW: only return leads belonging to this user
    const result = await LeadService.getAllLeads(req.user?.id as string);
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
    // NEW: pass userId — users can't access other users' leads
    const result = await LeadService.getSingleLead(
      req.params.id as string,
      req.user?.id as string,
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
    const result = await LeadService.updateLead(
      req.params.id as string,
      req.user?.id as string, // NEW: verify ownership
      req.body,
    );
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
    await LeadService.deleteLead(
      req.params.id as string,
      req.user?.id as string, // NEW: verify ownership
    );
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