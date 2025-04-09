import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-output.json' with { type: 'json' };
import userRoutes from './routes/users.routes.js';
import notesRoutes from './routes/notes.routes.js';
import staticRoutes from './routes/static.routes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

// Set template engine
app.set("view engine", "ejs");

// Middlewares (order matters)
app.use(express.static(path.resolve("public")));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Route mounting
app.use("/", staticRoutes);
app.use("/users", (req, res, next) => {
  console.log("Handling request under /users - From app.js");
  next();
}, userRoutes);
app.use("/notes", notesRoutes);
app.use("/auth", authRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Test route (moved outside the /users middleware)
app.get('/test', (req, res) => {
  res.send('Test route is working!');
});

export { app };