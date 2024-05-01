import express from "express";
const router=express.Router();
router.post("/user/register",(req,res)=>{
    return res.status(400).send({message:"user is registered suceessfully "});

})
export default router;