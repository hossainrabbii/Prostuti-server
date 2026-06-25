import { Links } from "./link.model.js";
// ১. লিংক সেভ বা আপডেট করা (Upsert Method)
const saveOrUpdateLinksInDB = async (payload) => {
    const result = await Links.findOneAndUpdate({}, // ফাকা অবজেক্ট মানে ডাটাবেজের প্রথম যে ডকুমেন্টটি পাবে সেটাই আপডেট করবে
    payload, {
        new: true,
        upsert: true, // ডকুমেন্ট না থাকলে নতুন ১টা তৈরি করবে, থাকলে আপডেট করবে
        runValidators: true,
    });
    return result;
};
// ২. সর্বশেষ লিংকটি ডাটাবেজ থেকে রিড করা
const getLatestLinksFromDB = async () => {
    const result = await Links.findOne(); // শুধু মাত্র একটি রো-ই রিটার্ন করবে
    return result;
};
export const LinksServices = {
    saveOrUpdateLinksInDB,
    getLatestLinksFromDB,
};
//# sourceMappingURL=link.service.js.map