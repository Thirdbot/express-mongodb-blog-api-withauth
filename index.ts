import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import blogRouter from "./routes/blogRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from 'cookie-parser'
import morgan from "morgan";


//load env vars
dotenv.config({path:'./.env'});


const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/blogapi';

//connecting server
const app = express();
const DB = mongoose.connect(mongoURI)

app.use(morgan("dev"))
app.use(cookieParser());
app.use(express.json());

app.use('/v1/api/user',userRouter)
app.use('/v1/api/blog',blogRouter)

//start server
DB.then(()=>{app.listen(3000,()=>{
    console.log(`server started at port 3000 where localhost:${PORT}`);
})})
