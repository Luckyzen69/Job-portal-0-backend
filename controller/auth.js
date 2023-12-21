const UserModel = require("../model/user")
let bcrypt = require('bcrypt')  
var jwt = require('jsonwebtoken');

              // sign up

  const signup = async (req,res,next)=>{
    console.log('req.body',req.body);
    try{
      
      let hashedPassword = await bcrypt.hash(req.body.password, 10 )
    console.log(hashedPassword);
      let user = await UserModel.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      });


      res.send(user)
    }catch(err){
     next(err)
    } 
  }
          

   // login
  const login = async (req,res,next)=>{
    console.log('req.body',req.body);
    try{
          // check if email exist in db or not 
          let user = await UserModel.findOne({email: req.body.email}).select("+password")
          console.log(user);

         if(user){
          user = user.toObject()
          let hashedPassword = user.password //password stored in db
          let matched=  await bcrypt.compare(req.body.password, hashedPassword);
          delete user.password
           const SECRET_KEY = 'shhhhh';
           var token = jwt.sign( user ,SECRET_KEY);
          if(matched){  
            return res.send({
              user: user,
              "token":token,
            })
        }

          return res.status(401).send("invaid credentials")}
          next();

    }catch(err){
      next(err);
    }
  }


  module.exports ={
    login,
    signup
  }