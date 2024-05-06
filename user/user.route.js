import express from "express";
import { registerUserValidation,emailValidationSchema } from "./user.validation.js";
import {User} from "./user.model.js";
import * as bcrypt from "bcrypt";
import * as Yup from "yup";

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
    // console.log(hashedPassword);
    newUser.password=hashedPassword;

    //create user
    await User.create(newUser);

    return res.status(201).send({message:"user is registered suceessfully "});

})

router.post("/user/login",async(req,res,next)=>{

    // console.log(req.body);
    const loginCredentials= req.body;
    //validate email 
    try{
       
        await emailValidationSchema.validate(loginCredentials.email)

    }catch(error){
        return res.status(400).send({message:error.message});

    }


return res.status(200).send({message:"Logged in Sucessfully"});
next()},async(req,res)=>{
    //extract Login Credentials from req.body 
    const loginCredentials=req.body;
    //check if email matches 
    const user= await User.findOne({email:loginCredentials.email});
    // if not user,throw error 
    if(!user){
        return res.status(404).send({message:"Invalid Credentials"})
    }
    //check for password matches or not 
    const passwordMatch = await bcrypt .compare(loginCredentials.password,user.password);
    console.log(passwordMatch);
    if(!passwordMatch){
        return res.status(404).send({message:"Invalid Credentials"})
    }
    user.password=undefined;
    return res.status(200).send({message:"Logged In Successfully"});


})
export default router;