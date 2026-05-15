import { LeadService } from "./lead.service.js";
export const createLead = async (req, res, next) => {
    try {
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
    }
    catch (error) {
        next(error);
    }
};
const getAllLeads = async (req, res, next) => {
    try {
        // NEW: only return leads belonging to this user
        const result = await LeadService.getAllLeads(req.user?.id);
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
        // NEW: pass userId — users can't access other users' leads
        const result = await LeadService.getSingleLead(req.params.id, req.user?.id);
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
        const result = await LeadService.updateLead(req.params.id, req.user?.id, // NEW: verify ownership
        req.body);
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
        await LeadService.deleteLead(req.params.id, req.user?.id);
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