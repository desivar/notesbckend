import express from "express";
const router = express.Router();

import {
  handleUserLogout as usersHandleUserLogout, // Alias the logout from users controller
  handleUserSignup,
} from "../controllers/users.controllers.js";

import {
  signin as handleUserSignin // Alias the signin from auth controller
} from "../controllers/authController.js";

//  SIGN-UP USER ROUTE      /users/sign-up
router.post("/sign-up", handleUserSignup);

// SIGN-IN USER ROUTE      /users/sign-in
router.post("/sign-in", handleUserSignin);

//  LOGOUT USER ROUTE      /users/logout
router.post("/logout", usersHandleUserLogout); // Use the aliased logout

export default router;