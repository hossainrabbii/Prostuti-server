import { TemplateService } from "./template.service.js";
const getAllTemplates = async (req, res, next) => {
    try {
        const result = await TemplateService.getAllTemplates(req.user?.id);
        res.status(200).json({ success: true, data: result });
    }
    catch (error) {
        next(error);
    }
};
const getSingleTemplate = async (req, res, next) => {
    try {
        const result = await TemplateService.getSingleTemplate(req.params.id, req.user?.id);
        res.status(200).json({ success: true, data: result });
    }
    catch (error) {
        next(error);
    }
};
const createTemplate = async (req, res, next) => {
    try {
        const payload = {
            ...req.body,
            userId: req.user?.id,
        };
        const result = await TemplateService.createTemplate(payload);
        res.status(201).json({ success: true, data: result });
    }
    catch (error) {
        next(error);
    }
};
const updateTemplate = async (req, res, next) => {
    try {
        const result = await TemplateService.updateTemplate(req.params.id, req.user?.id, req.body);
        res.status(200).json({ success: true, data: result });
    }
    catch (error) {
        next(error);
    }
};
const deleteTemplate = async (req, res, next) => {
    try {
        await TemplateService.deleteTemplate(req.params.id, req.user?.id);
        res.status(200).json({ success: true, message: "Template deleted" });
    }
    catch (error) {
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
//# sourceMappingURL=template.controller.js.map