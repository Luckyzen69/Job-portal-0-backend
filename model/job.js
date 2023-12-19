const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const JobSchema = new Schema({
    title: {
        type: String,
        required: true,
     },
     category: {
        type: String,
     },
     level: {
        type: String,
        required: true,
     },
     number: {
        type: Number,
        default:1,
     },
     deadline: {
        type: Number,
        required: true,
     },
     salary: {
        type: Number,
        default: 0, 
        min:0
         },
         discription:{
          type:String,
          maxLength: 255 
         },
         creatdAt:{
         type: Date,
         },
         creatdBy:{
          require: true,
          type:ObjectId,
          ref:"User"
         },
         image:{
          type: String // we save image in some direcity and only save image path
       },
    },
         {
          timestamps: true
      },
        
    );
 
const JobModel = mongoose.model("job",JobSchema)


module.exports = JobModel