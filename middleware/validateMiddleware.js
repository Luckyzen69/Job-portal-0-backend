    const authSchema = require("../model/authSchema")

    const  validationMiddleware= async(req,res,next) =>{
        const result = await authSchema(req.body)
        console.log(result)
        next(); 
    }
    module.exports= validationMiddleware