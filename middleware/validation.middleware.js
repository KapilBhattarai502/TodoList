

export const validateReqBody =(validationSchema)=>{
const validateFunc=async(req,res,next)=>{
    //extract page,limit data from req.body 
    
    //validate req.body 
    // todo : create validation middleware
    
    try{
        const data=req.body;
        await validationSchema.validate(data);
    }catch(error){
        //if validation fails throw error 
        res.status(404).send({message:error.message});
    }
    next();

}
return validateFunc;
}