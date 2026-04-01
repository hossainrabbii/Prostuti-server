import { Router } from "express";
import { WebsiteController } from "./website.controller.js";

const router = Router();

router.post("/", WebsiteController.createWebsite);

router.get("/", WebsiteController.getAllWebsites);

router.get("/:id", WebsiteController.getSingleWebsite);

router.patch("/:id", WebsiteController.updateWebsite);

router.delete("/:id", WebsiteController.deleteWebsite);

export const WebsiteRoutes = router;
