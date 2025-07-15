import { Router } from "express";
const router = Router();

import {
  signup,
  login,
  updateUser,
  userDetail,
} from "../Controllers/authControllers.js";

// Middlewares
import verifyToken from "../Middlewares/verifyToken.js";
import {
  signupValidation,
  loginValidation,
} from "../Middlewares/authValidations.js";

// Routes
router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.put("/updateUser", verifyToken, updateUser);
router.get("/userDetail", verifyToken, userDetail);

export default router;
