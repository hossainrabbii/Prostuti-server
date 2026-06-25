import { Router } from "express";
import { EnrollmentControllers } from "./enrollment.controller.js";

const router = Router();

router.post("/enroll", EnrollmentControllers.createEnrollment);
router.get("/", EnrollmentControllers.getAllEnrollments);
router.get("/student/:studentId", EnrollmentControllers.getStudentEnrollments);
router.patch("/update-status/:id", EnrollmentControllers.updateStatus); 

export const EnrollmentRoutes = router;