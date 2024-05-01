import express from "express";
import todoroutes from "./todo/todo.routes.js";
import { dbConnect } from "./db.connect.js";
import userroutes from "./user/user.route.js";



const app=express();

app.use(express.json());
app.use(todoroutes);
app.use(userroutes);
dbConnect();

const port = 4000;

app.listen(port,()=>{
    console.log(`App is listening to port ${port}`);
});
