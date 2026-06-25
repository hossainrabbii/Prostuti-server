import { Router } from "express";

import { authenticate } from "../../middleware/authenticate.js";
import { userControllers } from "./user.controller.js";

const router = Router();

router.post("/register", userControllers.registerUser);
router.post("/login", userControllers.loginUser);


export const userRouter = router;