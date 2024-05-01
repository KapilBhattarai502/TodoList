import mongoose from "mongoose";
const{Schema} =mongoose;
const userSchema=new Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        maxlength:55,


    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
    }
})
