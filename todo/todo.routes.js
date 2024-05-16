import express from "express";
import { todoValidationSchema } from "./todo.validation.js";
import { Todo } from "./todo.model.js";
import { extractAccessTokenFromHeaders} from "../utilis/token.from.headers.js";
import { checkMongoIdValidity } from "../utilis/mongo.id.validity.js";
import jwt from "jsonwebtoken";
import { User } from "../user/user.model.js";
import { validateaAccessToken } from "../middleware/authentication.middleware.js";

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

    // console.log(token);
    
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
router.delete("/todo/delete/:id",validateaAccessToken,async(req,res)=>{
    // console.log(req);
    //extract id from req.params

    const todoId=req.params.id;
    
    

    

    // check for mongo id validity 
    const isValidMongoId= checkMongoIdValidity(todoId);
    // if not valid mongo id ,throw error
    if(!isValidMongoId){
        return res.status(400).send({message:"Invalid Mongo Id:"});
    }
    



    // check if todo exists with that id exists 
    const todo=await Todo.findOne({_id:todoId})

    //if not todo ,throw error
    if(!todo){
        return res.status(400).send({message:"Todo doesnot exist."})
    }

    //check if logged in user is owner of that todo 
    const tokenUserId=req.userDetails._id;
    const todoOwnerId=todo.userId;

    const isOwnerOfTodo =todoOwnerId.equals(tokenUserId);





    //if not owner ,throw error 
    if(!isOwnerOfTodo){
        return res.status(403).send({message:"You are not owner of this todo."})
    }

    //delete todo 
    await Todo.deleteOne({_id:todoId})

    //send appropriate response 
    return res.status(200).send({message:"Todo is deleted Successfully"})

})

router.get("/todo/details/:id",validateaAccessToken,async(req,res)=>{
     //extract id from req.params
     const todoId=req.params.id;
     

    // check for valid mongo id 
    const isValidMongoId=checkMongoIdValidity(todoId);

    //if not valid mongo Id throw error 
    if(!isValidMongoId){
        return res.status(404).send({message:"Not a valid Mongo Id"})
    }

    //if valid show the details 
    const todoList= await Todo.findOne({_id:todoId});
    //if not todo throw error 
    if(!todoList){
        return res.status(404).send({message:"There is no such todoList"})
    }
    //check for todo Ownership 
    const todoOwnerId=todoList.userId;
    const loggedInuserId=req.userDetails._id;

    const  isOwnerOfTodo=todoOwnerId.equals(loggedInuserId);

    if(!isOwnerOfTodo){
        return res.status(403).send({message:"you are not authorised "})
    }
    todoList.userId=undefined;

    return res.status(200).send({todoList});


})

export default router;