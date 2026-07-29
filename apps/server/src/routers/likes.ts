import "dotenv/config"
import {prisma} from "@repo/db"
import { Router,Response,Request,NextFunction } from "express"

const router:Router=Router()

router.post("/like")
