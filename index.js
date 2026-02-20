import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import blogRouter from "./routes/blogRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from 'cookie-parser'
import {requiredAuth} from "./utils/authenicator.js";


//load env vars
dotenv.config({path:'./.env'});

const PORT = process.env.PORT;
const mongoURI = process.env.MONGO_URI;

//connecting server
const app = express();
const DB = mongoose.connect(mongoURI)
console.log(DB);

app.use(cookieParser());
app.use(express.json());

app.use('/v1/api/user',userRouter)
app.use('/v1/api/blog',blogRouter)

//start server
DB.then(()=>{app.listen(3000,()=>{
    console.log(`server started at port 3000 where localhost:${PORT}`);
})})
