import { TemplateService } from "./template.service.js";
const createTemplate = async (req, res) => {
    console.log(req?.body);
    try {
        const result = await TemplateService.createTemplate(req.body);
        console.log(result);
        res.status(201).json({
            success: true,
            message: "Template created successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
const getAllTemplates = async (req, res) => {
    try {
        const result = await TemplateService.getAllTemplates();
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const getSingleTemplate = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await TemplateService.getSingleTemplate(id);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};
const updateTemplate = async (req, res) => {
    console.log(req?.body);
    try {
        const id = req.params.id;
        const result = await TemplateService.updateTemplate(id, req.body);
        res.status(200).json({
            success: true,
            message: "Template updated",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
const deleteTemplate = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await TemplateService.deleteTemplate(id);
        res.status(200).json({
            success: true,
            message: "Template deleted",
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};
export const TemplateController = {
    createTemplate,
    getAllTemplates,
    getSingleTemplate,
    updateTemplate,
    deleteTemplate,
};
//# sourceMappingURL=template.controller.js.map