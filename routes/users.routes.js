import express from "express";
import {
  handleUserLogout,
  handleUserSignup,
} from "../controllers/users.controllers.js";
import {
  signin as handleUserSignin // Import the signin function from authController and alias it
} from "../controllers/authController.js";

const router = express.Router();

//  SIGN-UP USER ROUTE      /users/sign-up
router.post("/sign-up", handleUserSignup);

// SIGN-IN USER ROUTE      /users/sign-in
router.post("/sign-in", handleUserSignin);

//  LOGOUT USER ROUTE      /users/logout
router.post("/logout", handleUserLogout);

export default router;