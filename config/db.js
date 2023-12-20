
const mongoose = require('mongoose');
const connectDB = async (req,res) =>{
    try{
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`connected to Mongodb datase ${mongoose.connection.host}`);
  } 
  catch(err){
    res.status(500).send({  error : err.message})
    process.exit(1);
  }
    };

    module.exports = {
        connectDB,
    }
