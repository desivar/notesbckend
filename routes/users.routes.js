import express from "express";
const router = express.Router();

import { signin as handleUserSignin } from "../controllers/authController.js";

// SIGN-IN USER ROUTE      /users/sign-in
router.post("/sign-in", handleUserSignin);

export default router;