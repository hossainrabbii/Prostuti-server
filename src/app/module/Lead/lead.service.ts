import { ILead } from "./lead.interface.js";
import { LeadModel } from "./lead.model.js";

// EDITED: all operations scoped to userId
const getAllLeads = async (userId: string) => {
  return LeadModel.find({ userId }).sort({ createdAt: -1 });
};

const getSingleLead = async (id: string, userId: string) => {
  const lead = await LeadModel.findOne({ _id: id, userId });
  if (!lead) throw new Error("Lead not found");
  return lead;
};

const createLead = async (payload: ILead) => {
  const filter: any = {
    userId: payload.userId,
    mailId: payload.mailId,
  };
  
  if (filter.currentUrl === payload.currentUrl) {
    console.log('This mailId and currentUrl already exist in your leads list.');
    // filter.currentUrl = payload.currentUrl;
    console.log('Throwing error', filter);
    throw new Error('This mailId and currentUrl already exist in your leads list.');

  }
  
  // const exists = await LeadModel.findOne(filter);
  // if (exists) {
  //   throw new Error(`Mail ID "${payload.mailId}" already exists`);
  // }
  return LeadModel.create(payload);
};

const updateLead = async (
  id: string,
  userId: string,
  payload: Partial<ILead>,
) => {
  const { userId: _ignored, ...safe } = payload;
  const lead = await LeadModel.findOneAndUpdate(
    { _id: id, userId }, // only update if owned by this user
    safe,
    { new: true, runValidators: true },
  );
  if (!lead) throw new Error("Lead not found");
  return lead;
};

const deleteLead = async (id: string, userId: string) => {
  const lead = await LeadModel.findOneAndDelete({ _id: id, userId });
  if (!lead) throw new Error("Lead not found");
  return lead;
};

export const LeadService = {
  getAllLeads,
  getSingleLead,
  createLead,
  updateLead,
  deleteLead,
};