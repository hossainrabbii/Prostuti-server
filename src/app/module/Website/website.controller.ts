import { NextFunction, Request, Response } from "express";
import { WebsiteService } from "./website.service.js";
import { WebsiteModel } from "./website.model.js";

export const createWebsite = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const website = await WebsiteModel.create(req.body);
    res.status(201).json({
      success: true,
      message: "Website created successfully",
      data: website,
    });
  } catch (error) {
    next(error);
  }
};

const getAllWebsites = async (
  _req: Request,
  res: Response,
  next: NextFunction, 
) => {
  try {
    const result = await WebsiteService.getAllWebsites();

    console.log(result);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleWebsite = async (
  req: Request,
  res: Response,
  next: NextFunction, 
) => {
  try {
    const result = await WebsiteService.getSingleWebsite(
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

const updateWebsite = async (
  req: Request,
  res: Response,
  next: NextFunction, 
) => {
  try {
    const id = req.params.id as string;
    const result = await WebsiteService.updateWebsite(id, req.body);
    res.status(200).json({
      success: true,
      message: "Website updated",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteWebsite = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await WebsiteService.deleteWebsite(req.params.id as string);
    res.status(200).json({
      success: true,
      message: "Website deleted",
    });
  } catch (error) {
    next(error); 
  }
};

export const WebsiteController = {
  createWebsite,
  getAllWebsites,
  getSingleWebsite,
  updateWebsite,
  deleteWebsite,
};
