import "dotenv/config"
import {prisma} from "@repo/db"
import {Router,Response,Request,NextFunction} from "express"

const router=Router()
router.post("/user",async (req:Request,res:Response,next:NextFunction)=>{
       const {name,email}=req.body
       try {
          const user=await prisma.user.create({
            data:{
                name:name,
                email:email
            }
          })
          return res.json({success:true,user:user})
       } catch (error) {
          next(error||'user is not created')
       }
})
router.get("/users/all",async (req:Request,res:Response,next:NextFunction)=>{
     try {
        const users=await prisma.user.findMany({});
        return res.json({success:true,users:users});
     } catch (error) {
         next(error)
     }

})
router.get("/user/posts",async(req:Request,res:Response,next:NextFunction)=>{
      //@ts-ignore
      const user_id=req.user_id 
      try {
        const posts=await prisma.post.findMany({
            where:{
                user_id:user_id
            }
        })
        return res.json({succcess:true,posts:posts})

      } catch (error) {
         next(error)
      }
})
