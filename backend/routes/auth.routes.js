import express from "express";

import AuthController from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/jwtAuth.middleware.js";

const router = express.Router();

const authController = new AuthController();

// REGISTER
router.post("/register", authController.postRegister);

// LOGIN
router.post("/login", authController.postLogin);

//CURRENT USER
router.get("/me", isAuthenticated, authController.getCurrentUser);

// LOGOUT
router.post("/logout", authController.logout);

export default router;
