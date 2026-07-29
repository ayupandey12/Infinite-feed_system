import "dotenv/config"
import {prisma} from "@repo/db"
import { Router,Response,Request,NextFunction } from "express"

const router:Router=Router()

router.post("/like",async(req:Request,res:Response,next:NextFunction)=>{
    const {post_id}=req.body
    //@ts-ignore
    const user_id =req.user_id
    try {
        const like=await prisma.like.create({
            data:{
                post_id:post_id,
                user_id:user_id
            }
        })
        return res.json({success:true,like})
    } catch (error) {
        next(error)
    }
})
export default router
