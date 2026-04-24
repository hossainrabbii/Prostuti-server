import { Router } from "express";
import { LeadController } from "./lead.controller.js";
import { authenticate } from "../../middleware/authenticate.js";
const router = Router();
router.post("/", LeadController.createLead);
router.get("/", authenticate, LeadController.getAllLeads);
router.get("/:id", authenticate, LeadController.getSingleLead);
router.patch("/:id", authenticate, LeadController.updateLead);
router.delete("/:id", authenticate, LeadController.deleteLead);
export const LeadRoutes = router;
//# sourceMappingURL=lead.routes.js.map