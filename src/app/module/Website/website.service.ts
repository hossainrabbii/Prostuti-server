import { IWebsite } from "./website.interface.js";
import { WebsiteModel } from "./website.model.js";

const createWebsite = async (payload: IWebsite) => {
  const result = await WebsiteModel.create(payload);
  return result;
};

const getAllWebsites = async () => {
  const result = await WebsiteModel.find();
  return result;
};

const getSingleWebsite = async (id: string) => {
  const result = await WebsiteModel.findById(id);
  return result;
};

const updateWebsite = async (id: string, payload: Partial<IWebsite>) => {
  const result = await WebsiteModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteWebsite = async (id: string) => {
  const result = await WebsiteModel.findByIdAndDelete(id);
  return result;
};

export const WebsiteService = {
  createWebsite,
  getAllWebsites,
  getSingleWebsite,
  updateWebsite,
  deleteWebsite,
};
