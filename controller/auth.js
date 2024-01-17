const UserModel = require("../model/user")
let bcrypt = require('bcrypt')  
var jwt = require('jsonwebtoken');

              // sign up

  const signup = async (req,res,next)=>{
   
    console.log('req.body',req.body);
    console.log(result);
    try{
      
      let hashedPassword = await bcrypt.hash(req.body.password, 10 )
    console.log(hashedPassword);
      let user = await UserModel.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        cpassword: hashedPassword,
        phone:req.body.phone,
        role:req.body.selectedRole,
        experience:req.body.experience,
        company:req.body.company,
        gender:req.body.gender
      }); 
      //removing sensative informations
      const sanitizedUser = { ...user._doc };
      delete sanitizedUser.password;
      delete sanitizedUser.cpassword;

     
      res.send(user)
    }catch(err){
     next(err)
    } 
  }
          

   // login
   const login = async (req,res,next)=>{
     console.log('req.body',req.body);
     
     try{
       
       if(user){
         user = user.toObject()
         let hashedPassword = user.password //password stored in db
         let matched=  await bcrypt.compare(req.body.password, hashedPassword);
  
         delete user.password
         const SECRET_KEY = 'shhhhh';
         var token = jwt.sign( user ,SECRET_KEY);
         if(matched){  
           return res.send({
              user: user.toObject,
              "token":token,
            })
          }
          
          next();
        }

    }catch(err){
      next(err);
    }
  }


  module.exports ={
    login,
    signup
  }