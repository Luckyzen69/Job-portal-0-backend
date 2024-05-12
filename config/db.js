
const mongoose = require('mongoose');


const connectDB = async (req,res,next) =>{
    try{
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`connected to Mongodb datase ${mongoose.connection.host}`);
  } 
  catch(error){ 
   console.log(`error:${error.message}`);
  }
    };  

    module.exports = connectDB
