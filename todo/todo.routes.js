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

export default router;