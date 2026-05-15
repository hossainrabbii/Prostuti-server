import { LeadModel } from "./lead.model.js";
// EDITED: all operations scoped to userId
const getAllLeads = async (userId) => {
    return LeadModel.find({ userId }).sort({ createdAt: -1 });
};
const getSingleLead = async (id, userId) => {
    const lead = await LeadModel.findOne({ _id: id, userId });
    if (!lead)
        throw new Error("Lead not found");
    return lead;
};
const createLead = async (payload) => {
    const filter = {
        userId: payload.userId,
        mailId: payload.mailId,
    };
    if (payload.currentUrl) {
        filter.currentUrl = payload.currentUrl;
    }
    const exists = await LeadModel.findOne(filter);
    if (exists) {
        throw new Error(`Mail ID "${payload.mailId}" already exists`);
    }
    return LeadModel.create(payload);
};
const updateLead = async (id, userId, payload) => {
    const { userId: _ignored, ...safe } = payload;
    const lead = await LeadModel.findOneAndUpdate({ _id: id, userId }, // only update if owned by this user
    safe, { new: true, runValidators: true });
    if (!lead)
        throw new Error("Lead not found");
    return lead;
};
const deleteLead = async (id, userId) => {
    const lead = await LeadModel.findOneAndDelete({ _id: id, userId });
    if (!lead)
        throw new Error("Lead not found");
    return lead;
};
export const LeadService = {
    getAllLeads,
    getSingleLead,
    createLead,
    updateLead,
    deleteLead,
};
//# sourceMappingURL=lead.service.js.map