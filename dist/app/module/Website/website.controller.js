import { WebsiteService } from "./website.service.js";
export const createWebsite = async (req, res, next) => {
    try {
        const website = await WebsiteService.createWebsite(req.body);
        res.status(201).json({
            success: true,
            message: "Lead added successfully.",
            data: website,
        });
    }
    catch (error) {
        next(error);
    }
};
const getAllWebsites = async (_req, res, next) => {
    try {
        const result = await WebsiteService.getAllWebsites();
        console.log(result);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const getSingleWebsite = async (req, res, next) => {
    try {
        const result = await WebsiteService.getSingleWebsite(req.params.id);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const updateWebsite = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await WebsiteService.updateWebsite(id, req.body);
        res.status(200).json({
            success: true,
            message: "Lead updated successfully.",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const deleteWebsite = async (req, res, next) => {
    try {
        await WebsiteService.deleteWebsite(req.params.id);
        res.status(200).json({
            success: true,
            message: "Lead deleted successfully.",
        });
    }
    catch (error) {
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
//# sourceMappingURL=website.controller.js.map