import express from "express";
import { TemplateController } from "./template.controller.js";
import { authenticate } from "../../middleware/authenticate.js";
const router = express.Router();
router.post("/", authenticate, TemplateController.createTemplate);
router.get("/", authenticate, TemplateController.getAllTemplates);
router.get("/:id", authenticate, TemplateController.getSingleTemplate);
router.patch("/:id", authenticate, TemplateController.updateTemplate);
router.delete("/:id", authenticate, TemplateController.deleteTemplate);
export const TemplateRoutes = router;
//# sourceMappingURL=template.route.js.map