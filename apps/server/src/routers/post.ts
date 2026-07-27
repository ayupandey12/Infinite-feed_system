import { Router } from "express";
const router:Router= Router()
router.get("/post/:id",(req,res)=>{
    const {id}=req.params
    console.log(id);
    res.status(200).json({"success":true,"postid":id})
})
export default  router ;