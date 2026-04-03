import express from "express";
import { TemplateController } from "./template.controller.js";
const router = express.Router();
router.post("/", TemplateController.createTemplate);
router.get("/", TemplateController.getAllTemplates);
router.get("/:id", TemplateController.getSingleTemplate);
router.patch("/:id", TemplateController.updateTemplate);
router.delete("/:id", TemplateController.deleteTemplate);
export const TemplateRoutes = router;
//# sourceMappingURL=template.route.js.map