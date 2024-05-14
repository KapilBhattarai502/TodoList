import {User} from "./user.model.js";
import * as bcrypt from "bcrypt";
import { emailValidationSchema } from "./user.validation.js";
import  jwt from "jsonwebtoken";
import { registerUserValidationSchema } from "./user.validation.js";

// Function for validating new User
export const validateNewUser =async(req,res,next)=>{
    //extract new user data from req body 
    const newUser=req.body;
    //validate new user 
    try{
        await registerUserValidationSchema.validate(newUser)
    } catch(error){
        // if validation fails,throw error 
        return res.status(400).send({message:error.message});
    }
    next();}
    
    // function for registering new user 

    export const registerUser=async(req,res)=>{
    
        //extract new user data from req.body
        const newUser=req.body;
        //check if user with this email exists 
        const user =await User.findOne({email:newUser.email});
    
        
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
    
    }

    // function for validating user email
    export const validateUserEmail=async(req,res,next)=>{

        // console.log(req.body);
        const loginCredentials= req.body;
        //validate email 
        try{
           
            await emailValidationSchema.validate(loginCredentials.email)
    
        }catch(error){
            return res.status(400).send({message:error.message});
    
        }
    
    
    
    next();
    }
    

    //login user and send token 
   export const loginUser=async(req,res)=>{
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
        //generate token 

        const token=jwt.sign({email:user.email},"abcdabcdabcdabcd")
        console.log(token);
        return res.status(200).send({message:"Logged In Successfully"});
    
    
    }