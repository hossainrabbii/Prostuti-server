import { Router } from "express";
import { userRouter } from "../module/User/user.route.js";
import { CourseRoutes } from "../module/Course/course.route.js";
import { EnrollmentRoutes } from "../module/Enrollement/enrollment.route.js";
import { NoticeRoutes } from "../module/notice/notice.route.js";
import { LinksRoutes } from "../module/Link/link.route.js";
const routes = Router();
const allRoutes = [
    {
        path: "/user",
        route: userRouter,
    },
    {
        path: "/courses",
        route: CourseRoutes,
    },
    {
        path: "/enrollments",
        route: EnrollmentRoutes,
    },
    {
        path: "/notices",
        route: NoticeRoutes,
    },
    {
        path: "/links",
        route: LinksRoutes,
    },
];
allRoutes.forEach((route) => routes.use(route.path, route.route));
export default routes;
//# sourceMappingURL=routes.js.map