import express from "express";
import { todoValidationSchema } from "./todo.validation.js";

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


},(req,res)=>{
    console.log(req.body)
    return res.status(201).send({message:"Todo is added sucessfully"});
    
    
});

export default router;