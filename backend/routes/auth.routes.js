import express from "express";

import AuthController from "../controllers/auth.controller.js";

const router = express.Router();

const authController = new AuthController();


// REGISTER
router.post("/register", authController.postRegister);


// LOGIN
router.post("/login", authController.postLogin);


// LOGOUT
router.post("/logout", authController.logout);


export default router;