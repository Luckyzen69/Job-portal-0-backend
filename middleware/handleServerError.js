module.exports = (err,req,res,next)=>{
    let status =500
    let message ="Server Error"
    let errors=[]
  
    if(err.name == "ValidationError"){
      status = 400;
      message= "Bad Request"
      let errorsArray = Object.entries(err.errors )   // { name: erroObject , email: errorObject } // =>  [ [name,nameErrorObject],[email,emailErrorObject] ]
          
          errorsArray.forEach(validationError =>{
              errors.push({
                  field: validationError[0],
                  message: validationError[1].message
              })
         })
  
    }
      res.status(status).send({
          "error":err.message,
          "msg":message,
        "errorStack":err.Stack
  
      })
  
  }
  