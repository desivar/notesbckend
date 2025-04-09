import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-output.json' with { type: 'json' };
import userRoutes from './routes/users.routes.js';
import notesRoutes from './routes/notes.routes.js';
import staticRoutes from './routes/static.routes.js';
import authRoutes from './routes/authRoutes.js';
import { signin } from './controllers/authController.js'; // TEMPORARY IMPORT for direct test
import path from 'path'; // Ensure 'path' is imported

dotenv.config();

const app = express();
const port = process.env.PORT || 5500;

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
  console.log("Handling request under /users - Consolidated server.js");
  next();
}, userRoutes);
app.use("/notes", notesRoutes);
app.use("/auth", authRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// TEMPORARY TEST ROUTE (for consolidated server.js)
app.post('/test-signin', async (req, res) => {
  console.log("Hit the /test-signin route - Consolidated server.js");
  await signin(req, res);
  console.log("Finished executing signin function - Consolidated server.js");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(' MongoDB connected !! DB HOST:', mongoose.connection.host))
  .catch((err) => console.error(' MongoDB connection error:', err));

app.listen(port, () => {
  console.log('Server running at port:', port);
});