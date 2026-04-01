import { Router } from "express";
import { WebsiteRoutes } from "../module/Website/website.routes.js";
import { TemplateRoutes } from "../module/template/template.route.js";
import { MailRoutes } from "../module/Mail/mail.route.js";

const routes = Router();
const allRoutes = [
  {
    path: "/websites",
    route: WebsiteRoutes,
  },
  {
    path: "/templates",
    route: TemplateRoutes,
  },
  {
    path: "/mail",
    route: MailRoutes,
  },
];

allRoutes.forEach((route) => routes.use(route.path, route.route));
export default routes;
