import mongoose from "mongoose";
const{Schema} =mongoose;
const userSchema=new Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        maxlength:55,


    },
    lastName:{
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
    },
    password:{
        type:String,
        required:true,

    },
    gender:{
        type:String,
        enum:["male","Female","preferNotToSay"],
        required:false,
     }
     
});
export const User=mongoose.model('User',userSchema);
