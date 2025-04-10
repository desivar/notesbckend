// server.js
import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); // Configure dotenv immediately

import mongoose from "mongoose";
import { app } from "./app.js"; // Import the app

const PORT = process.env.PORT || 5500; // Use your desired port
const mongoUri = process.env.MONGODB_URI; // Access the variable directly

// CONNECTION WITH DATABASE & RUN SERVER
mongoose.connect(mongoUri) // Use the explicitly accessed variable
  .then(() => {
    console.log(" MongoDB connected !! DB HOST:", mongoose.connection.host);
    app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
  })
  .catch((err) => {
    console.log("MongoDB connection failed !!! ", err);
  });