import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import {v2 as cloudinary} from "cloudinary";
import multer from "multer";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import productRoute from "./routes/productRoutes.js";

config();

const app = express();

app.use(cors());

app.listen(process.env.PORT,()=>{
    console.log(`Server is Succesfully Running on Port : ${process.env.PORT}`);
});

mongoose
    .connect(process.env.mongodb)
    .then(()=> console.log("Succesfully Connected to the Database."))
    .catch((error) =>console.log(error));

app.use(express.json());

app.use('/product',productRoute);