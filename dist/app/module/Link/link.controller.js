import { LinksServices } from './link.service.js';
// ১. লিংক সেভ/আপডেট কন্ট্রোলার
const saveLinks = async (req, res) => {
    try {
        const result = await LinksServices.saveOrUpdateLinksInDB(req.body);
        res.status(200).json({
            success: true,
            message: 'Links saved successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Something went wrong!' });
    }
};
// ২. লিংক গেট কন্ট্রোলার
const getLatestLinks = async (req, res) => {
    try {
        const result = await LinksServices.getLatestLinksFromDB();
        res.status(200).json({
            success: true,
            message: 'Latest links fetched successfully!',
            data: result || { liveUrl: "", examUrl: "" }, // ডাটাবেজ ফাকা থাকলে ডিফল্ট অবজেক্ট দেবে
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Something went wrong!' });
    }
};
export const LinksControllers = {
    saveLinks,
    getLatestLinks,
};
//# sourceMappingURL=link.controller.js.map