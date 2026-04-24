import { LeadService } from "./lead.service.js";
export const createLead = async (req, res, next) => {
    try {
        const Lead = await LeadService.createLead(req.body);
        res.status(201).json({
            success: true,
            message: "Lead added successfully.",
            data: Lead,
        });
    }
    catch (error) {
        next(error);
    }
};
const getAllLeads = async (_req, res, next) => {
    try {
        const result = await LeadService.getAllLeads();
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
const getSingleLead = async (req, res, next) => {
    try {
        const result = await LeadService.getSingleLead(req.params.id);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const updateLead = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await LeadService.updateLead(id, req.body);
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
const deleteLead = async (req, res, next) => {
    try {
        await LeadService.deleteLead(req.params.id);
        res.status(200).json({
            success: true,
            message: "Lead deleted successfully.",
        });
    }
    catch (error) {
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
//# sourceMappingURL=lead.controller.js.map