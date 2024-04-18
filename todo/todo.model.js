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
        maxLength:55,

    },
    date:{
        type:Date,
        required:true,
    }
    

    
});
export const Todo = mongoose.model('Todo', todoSchema);

//create table 
