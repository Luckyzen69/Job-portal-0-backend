const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

// Set the default maxTimeMS for findOne queries
mongoose.set('maxTimeMS', 10000);

const UserSchema = new Schema({
  username:{
    require: true,
    type: String,
    minLength:"3",
  },
  email: {
    type: String,
    required: true,
    validate:{
      validator:async function(requestValue){
        //custom logic
        try{

          let user = await mongoose.models.User.findOne({email: requestValue})    
          if(user){
            return false;
          }
          return true;
      }catch(error){
        console.log(`error during email validation : ${error.message}`);
        return false;  //validation failed incase of error
      } 
    },
      message:"email already used",
    }
  },
  password: {
    type: String,
    required: true,
    select: false,
    min:5,
    max:18,
  },
  cpassword: {
    type: String,
    required: true,
    select: false,
    min:5,
    max:18,
  },
  phone:{
    type:Number,
  },
  role:{
    type:String,
    required: true,
    enum:['JobSeeker','Jobrecuiter'],
    default:'JobSeeker',
  },
  gender:{
    type:String,
    enum: ['Male','Female'],
    default:'Male'    
  },
  
});



const UserModel = mongoose.model("User",UserSchema)
module.exports = UserModel