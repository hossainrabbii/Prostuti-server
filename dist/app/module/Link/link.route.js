import express from 'express';
import { LinksControllers } from './link.controller.js';
const router = express.Router();
router.post('/save-links', LinksControllers.saveLinks); // লিংক ক্রিয়েট বা আপডেটের জন্য
router.get('/latest', LinksControllers.getLatestLinks); // লেটেস্ট লিংক ফ্রন্টএন্ডে দেখানোর জন্য
export const LinksRoutes = router;
//# sourceMappingURL=link.route.js.map