import "dotenv/config"
import {prisma} from "@repo/db"
import express, { Request, Response, NextFunction } from "express";
import postapi from "./routers/post.js"
function errorhandler(err: Error, req: Request, res: Response, next: NextFunction) {
    return res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
}
const app=express()

app.use(express.json())
app.use('/api',postapi)
app.use(errorhandler)
app.listen(3000,()=>{
    console.log("server in going and going......")
})