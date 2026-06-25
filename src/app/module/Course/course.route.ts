import { Router } from "express";
import { CourseControllers } from "./course.controller.js";

const router = Router();

router.post("/create-course", CourseControllers.createCourse);
router.get("/", CourseControllers.getAllCourses);
router.get("/:id", CourseControllers.getSingleCourse);
router.patch("/:id", CourseControllers.updateCourse);
router.delete("/:id", CourseControllers.deleteCourse);

export const CourseRoutes = router;