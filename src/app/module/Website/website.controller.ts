import { Request, Response } from "express";
import { WebsiteService } from "./website.service.js";

const createWebsite = async (req: Request, res: Response) => {
 
  try {
    const result = await WebsiteService.createWebsite(req.body);

    res.status(201).json({
      success: true,
      message: "Website added successfully.",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create website",
      error,
    });
  }
};

const getAllWebsites = async (_req: Request, res: Response) => {
  try {
    const result = await WebsiteService.getAllWebsites();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

const getSingleWebsite = async (req: Request, res: Response) => {
  try {
    const result = await WebsiteService.getSingleWebsite(
      req.params.id as string,
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

const updateWebsite = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const result = await WebsiteService.updateWebsite(id, req.body);

    res.status(200).json({
      success: true,
      message: "Website updated",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

const deleteWebsite = async (req: Request, res: Response) => {
  try {
    await WebsiteService.deleteWebsite(req.params.id as string);

    res.status(200).json({
      success: true,
      message: "Website deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

export const WebsiteController = {
  createWebsite,
  getAllWebsites,
  getSingleWebsite,
  updateWebsite,
  deleteWebsite,
};
