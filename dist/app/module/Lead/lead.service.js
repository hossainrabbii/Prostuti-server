import { LeadModel } from "./lead.model.js";
const createLead = async (payload) => {
    const exists = await LeadModel.findOne({ mailId: payload.mailId });
    if (exists) {
        throw new Error(`Mail ID "${payload.mailId}" already exists`);
    }
    return LeadModel.create(payload);
};
const getAllLeads = async () => {
    const result = await LeadModel.find();
    return result;
};
const getSingleLead = async (id) => {
    const result = await LeadModel.findById(id);
    return result;
};
const updateLead = async (id, payload) => {
    const result = await LeadModel.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
};
const deleteLead = async (id) => {
    const result = await LeadModel.findByIdAndDelete(id);
    return result;
};
export const LeadService = {
    createLead,
    getAllLeads,
    getSingleLead,
    updateLead,
    deleteLead,
};
//# sourceMappingURL=lead.service.js.map