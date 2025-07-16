import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import {v2 as cloudinary} from "cloudinary";
import multer from "multer";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import productRoute from "./routes/productRoutes.js";
import StripeRoute from "./routes/StripeRoute.js";
import subscriberRoute from "./routes/subscriberRoute.js"
import {authRouter} from "./controllers/authController.js";

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

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use((req, res, next) => {
    req.cloudinary = cloudinary;
    next();
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'images',
        allowedFormats: ['jpeg', 'png', 'jpg'],
    }
});

const parser = multer({ storage: storage });


app.post('/upload-image', (req, res) => {

    console.log('? Upload request received');

   

    parser.single('file')(req, res, (err) => {

        if (err) {

            console.error('❌ Multer/Cloudinary Error:', err);

            return res.status(500).send(err.message);

        }

       

        console.log('? Checking file in request...');

        if (!req.file) {

            console.log('❌ No file found in request');

            return res.status(400).send('No file uploaded.');

        }



        try {

            console.log('? File details:', {

                fieldname: req.file.fieldname,

                originalname: req.file.originalname,

                mimetype: req.file.mimetype,

                size: req.file.size,

                path: req.file.path || 'No path'

            });



            if (!req.file.path) {

                console.error('❌ No path in uploaded file');

                throw new Error('File uploaded, but no path available');

            }



            console.log('✅ Upload successful, returning URL:', req.file.path);

            res.json({ secure_url: req.file.path });

        } catch (error) {

            console.error('❌ Error during file processing:', error);

            console.error('Full error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));

            res.status(500).send(error.message || 'Internal server error');

        }

    });

});

app.use('/stripe',StripeRoute);
app.use('/subscriber',subscriberRoute);
app.use('/auth',authRouter);