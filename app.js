import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-output.json' with { type: 'json' };
import userRoutes from "./routes/users.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import staticRoutes from "./routes/static.routes.js";
import authRoutes from "./routes/authRoutes.js";
import { signin } from './controllers/authController.js'; // TEMPORARY IMPORT

const app = express(); // Declare and initialize 'app'

// SET TEMPLATE ENGINE AS EJS
app.set("view engine", "ejs");

// MIDDLEWARES
app.use(express.static(path.resolve("public")));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// ROUTES IMPORTS

// ROUTES DECLARATION
app.use("/", staticRoutes);
app.use("/users", userRoutes);
app.use("/notes", notesRoutes);
app.use("/auth", authRoutes); // Use the correctly imported authRoutes

// TEMPORARY ROUTE FOR TESTING SIGNIN LOGS
app.post('/test-signin', async (req, res) => {
  await signin(req, res);
});

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export { app }; // Export 'app' after it has been defined