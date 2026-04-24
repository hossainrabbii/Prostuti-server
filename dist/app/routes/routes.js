import { Router } from "express";
import { LeadRoutes } from "../module/Lead/lead.routes.js";
import { TemplateRoutes } from "../module/template/template.route.js";
import { MailRoutes } from "../module/Mail/mail.route.js";
import { authRouter } from "../module/Auth/auth.route.js";
const routes = Router();
const allRoutes = [
    {
        path: "/leads",
        route: LeadRoutes,
    },
    {
        path: "/templates",
        route: TemplateRoutes,
    },
    {
        path: "/mail",
        route: MailRoutes,
    },
    {
        path: "/auth",
        route: authRouter,
    },
];
allRoutes.forEach((route) => routes.use(route.path, route.route));
export default routes;
//# sourceMappingURL=routes.js.map