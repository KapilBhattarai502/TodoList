import express from "express";
import { todoValidationSchema } from "./todo.validation.js";
import { Todo } from "./todo.model.js";
import { extractAccessTokenFromHeaders } from "../utilis/token.from.headers.js";
import jwt from "jsonwebtoken";
import { User } from "../user/user.model.js";

const router =express.Router();
router.post("/todo/add",async(req,res,next)=>{
    const newTodo=req.body;
    try{
        await todoValidationSchema.validate(newTodo);

    }
    catch (error){

        return res.status(400).send({message:error.message});
    }
    next();


},async(req,res)=>{
    const newTodo=req.body;
    
    const token=extractAccessTokenFromHeaders(req.headers.authorization);

    console.log(token);
    
    //decrypt the token 
    const payload=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    // console.log(payload);
    
    
    //find user with email from payload

    const user=await User.findOne({email:payload.email});

    if(!user){
        return res.status(401).send({message:"Unauthorised."});
    }
    newTodo.userId=user._id;


    
    
    await Todo.create(newTodo);
    
    return res.status(201).send({message:"Todo is added sucessfully"});
    
    
});
router.delete("/todo/delete/:id",async(req,res,next)=>{
    // extract token from req.headers 
   
    const authorization=req.headers.authorization;
    const splittedValue=authorization.split(" ");
   const token =splittedValue[1];


   let payload;

    //decrypt token using signature 
   try{
     payload=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
     
     
    } catch(error){
        
        return res.status(401).send({message:error.message})
    }
    //find user from that email 
    const user= await User.findOne({email:payload.email});
    //if user doesnot exist throw error 
    if(!user){
        return res.status(401).send("Unauthorized");
    }



    //pass the flow
    next();

},(req,res)=>{
    //extract id from req.params
    

    

    // check for mongo id validity 

    // if not valid mongo id ,throw error

    // check if todo exists with that id exists 

    //if not todo ,throw error

    //check if logged in user is owner of that todo 

    //if not owner ,throw error 

    //delete todo 

    //send appropriate response 

})

export default router;