import express from "express";
import { registerUserValidation } from "./user.validation.js";
import {User} from "./user.model.js";
import * as bcrypt from "bcrypt";

const router=express.Router();
router.post("/user/register",async(req,res,next)=>{
    //extract new user data from req body 
    const newUser=req.body;
    //validate new user 
    try{
        await registerUserValidation.validate(newUser)
    } catch(error){
        // if validation fails,throw error 
        return res.status(400).send({message:error.message});
    }
    next();

},async(req,res)=>{
    
    //extract new user data from req.body
    const newUser=req.body;
    //check if user with this email exists 
    const user =await User.findOne({email:newUser.email});

    console.log(user);
    if(user){
        return res.status(409).send({message:"User with this email already exists"});

    }
    //hash password using bcrypt
    const hashedPassword=await bcrypt.hash(newUser.password,10);
    console.log(hashedPassword);

    //create user

    return res.status(400).send({message:"user is registered suceessfully "});

})
export default router;