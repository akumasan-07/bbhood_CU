import express from "express";
import dotenv from "dotenv";
import cors from 'cors';

import connectDB from "./utils/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json())
app.use("/api/auth",authRoutes);

app.listen(3000,()=>{
    connectDB();
    console.log("server is running on port 3000")
})