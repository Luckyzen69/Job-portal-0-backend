const express = require('express')
const app = express()
const cors = require('cors')
const authRoutes = require("./routes/auth")
const jobRoutes = require("./routes/job")
const handleServerError = require("./middleware/handleServerError")
const fileUpload = require("express-fileupload")
const dotenv = require("dotenv")
const connectDB = require('./config/db')


// env config
dotenv.config()

//mongodb connection
connectDB();

// global middleware
app.use(cors())
app.use(express.json())
app.use(fileUpload());

// local middleware
app.use(authRoutes)
app.use(jobRoutes)
app.use(handleServerError)

//main error handeling
app.use((err,req, res, next) => {
  res.status(400).send('server error from front');
  console.log(err);
  // next();
})
app.use((err,req, res, next) => {
  res.status(500).send('server error from back');
  console.log(err);
  // next();
})

//server starting
app.listen(8000, () => {
  console.log("server started");
})
