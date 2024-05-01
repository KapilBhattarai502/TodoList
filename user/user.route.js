import express from "express";
import { registerUserValidation } from "./user.validation.js";
const router=express.Router();
router.post("/user/register",async(req,res,next)=>{
    //extract new user data from req body 
    const newUser=req.body;
    //validate new user 
    try{
        await registerUserValidation.validate(newUser)
    } catch(error){
        return res.status(400).send({message:error.message});
    }
    next();

},(req,res)=>{
    

    

    // if validation fails,throw error 
    return res.status(400).send({message:"user is registered suceessfully "});

})
export default router;