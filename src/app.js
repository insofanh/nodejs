import express from "express";
import productRouter from "./routes/product.js";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routes/auth.js"

const app = express();


//middleware
app.use(express.json());
app.use(cors());

//router
app.use("/api", productRouter);
app.use("/api", authRouter);

mongoose.connect("mongodb://127.0.0.1:27017/we17303").then(console.log(1));

export const viteNodeApp = app;