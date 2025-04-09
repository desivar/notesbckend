// server.js (or index.js - whichever you prefer as your main server file)

import dotenv from "dotenv";
import { connectDB } from "./config/db.js"; // Assuming your database connection logic is in this file
import { app } from "./app.js"; // Assuming your Express app configuration is in app.js

// .ENV CONFIG
dotenv.config({
  path: "./.env",
});
console.log("JWT_SECRET from env:", process.env.JWT_SECRET);

const PORT = process.env.PORT || 5500;

// CONNECTION WITH DATABASE & RUN SERVER
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
  })
  .catch((err) => {
    console.log("MongoDB connection failed !!! ", err);
  });