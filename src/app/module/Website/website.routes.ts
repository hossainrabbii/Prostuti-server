import { Router } from "express";
import { WebsiteController } from "./website.controller.js";
import { authenticate } from "../../middleware/authenticate.js";

const router = Router();

router.post("/", WebsiteController.createWebsite);

router.get("/", authenticate, WebsiteController.getAllWebsites);

router.get("/:id", authenticate, WebsiteController.getSingleWebsite);

router.patch("/:id", authenticate, WebsiteController.updateWebsite);

router.delete("/:id", authenticate, WebsiteController.deleteWebsite);

export const WebsiteRoutes = router;