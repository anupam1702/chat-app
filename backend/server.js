import path from "path"
import express from "express"
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import authRoutes from "./router/authRoutes.js"
import userRoutes from "./router/userRoutes.js"

import connectToMongoDb from "./db/connectToMongoDb.js";  
import messageRoutes from "./router/messageRoutes.js"
import {app, server} from './socket/socket.js'
// const app=express();
import job from "../cron/cron.js";


job.start();
dotenv.config();
const PORT=process.env.PORT || 5000

const __dirname=path.resolve();

app.use(express.json());
app.use(cookieParser());

// app.get('/',(req,res)=>{
//     res.send("hello world")
// })

app.use('/api/auth',authRoutes)
app.use('/api/messages',messageRoutes)
app.use('/api/users',userRoutes)

app.use(express.static(path.join(__dirname,"/frontend/dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})

server.listen(PORT,()=>{
    connectToMongoDb();
    console.log(`app is running on port ${PORT}`);
})