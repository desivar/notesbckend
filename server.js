// server.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import { app } from "./app.js"; // Import the app

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 5500; // Use your desired port

// CONNECTION WITH DATABASE & RUN SERVER
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" MongoDB connected !! DB HOST:", mongoose.connection.host);
    app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
  })
  .catch((err) => {
    console.log("MongoDB connection failed !!! ", err);
  });