const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;


const UserSchema = new Schema({
  name:{
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
      let user = await mongoose.models.User.findOne({email: requestValue})
      if(user){
        return false
      }
      return true;
      },
      message:"email already used",
    }
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});



const UserModel = mongoose.model("User",UserSchema)
module.exports = UserModel