// THIS STATIC.ROUTES.JS FILE CONTAINS THE CODE THAT RENDER VIEWS TO THE BROWSER
import express from "express";
import { authenticated } from "../middlewares/authenticated.js";

const router = express.Router();

// RENDER HOME PAGE TO "/" ROOT PATH
router.get("/", async (req, res) => {
  res.render("home", { authenticated: req.isAuthenticated });
});

// RENDER SIGN-IN PAGE TO "/sign-in" PATH
router.get("/sign-in", (req, res) => {
  res.render("signin");
});

// RENDER SIGN-UP PAGE TO "/sign-up" PATH
router.get("/sign-up", (req, res) => {
  res.render("signup");
});

export default router;