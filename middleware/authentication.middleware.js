import jwt from "jsonwebtoken";
import {User} from "../user/user.model.js"

export const validateaAccessToken=async(req,res,next)=>{
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

}