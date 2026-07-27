import "dotenv/config"
import {prisma} from "@repo/db"
import express from "express";
import postapi from "./routers/post.js"

const app=express()
app.use('./api',postapi)
app.listen(3000,()=>{
    console.log("server in going and going......")
})