import { Router } from "express";
import  { Request, Response, NextFunction } from "express";
import "dotenv/config"
import { prisma } from "@repo/db";
const router:Router= Router()
router.get("/post/:id",async (req:Request,res:Response,next:NextFunction)=>{
    const {id}=req.params
    console.log(id);
    try {
        const post=await prisma.post.findFirst({
            where:{
                id:String(id)
            },
            select:{
                user:true
            }
        })
        res.status(200).json({"success":true,post:post})
    } catch (error) {
        
    }
    
})
router.post('/allposts',async (req:Request,res:Response,next:NextFunction)=>{
      try {
         const {cursorid,limit}=req.body
         const targetlimit=limit?Number(limit):50
         const posts=await prisma.post.findMany({
            where:{
               id:{
                gt:String(cursorid)//greater than id so find next limit=50 posts //pagination 
               }   
            },
            select:{
               id:true,
               data:true,
               user_id:true           
            },
            take:targetlimit,
            orderBy:{
                id:'asc'
            }
         }); 

          const nextCursor = posts.length === targetlimit ? posts[posts.length-1]?.id : null;

        return res.status(200).json({ 
            success: true, 
            posts: posts, 
            nextCursor: nextCursor // Sends the precise UUID string for the next fetch request
        });
      } catch (error) {
        next(error)
      }
})
router.post("/posts",async (req:Request,res:Response,next:NextFunction)=>{
    const {data}=req.body;
    //@ts-ignore
    const user_id=req.user_id
    try {
        const post =await prisma.post.create({
            data:{
                user_id:String(user_id),
                data:data,
            }
        })
        return res.status(200).json({post:post,success:true})
    } catch (error) {
          next(error)
    }
})
export default  router ;