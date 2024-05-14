import mongoose from "mongoose";
//set rules 
const { Schema } = mongoose;
const todoSchema =new Schema({
    title:{
        type:String,
        required:true, 
        trim:true,
        maxLength:30,
    },
    description:{
        type:String,
        required:true,
        trim:true,
        maxLength:57,

    },
    date:{
        type:Date,
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",

    }
    

    
});
//create table 
export const Todo = mongoose.model('Todo', todoSchema);


