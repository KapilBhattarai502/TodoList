import express from "express";

const router =express();
router.post("/todo/add",(req,res)=>{
    console.log(req.body)
    return res.status(201).send({message:"Todo is added sucessfully"});
    
    
});

export default router;