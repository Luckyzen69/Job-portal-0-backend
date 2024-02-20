const express = require('express')
const router = express.Router()
const auth = require("../controller/auth")
const {login,signup} = require("../controller/auth")
const {CheckPassword} = require("../middleware/auth")
const validationMiddleware = require('../middleware/validateMiddleware')
const verifyToken = require("../middleware/verifyToken")
// const {router} = require("./authRoutes?")

 router.post('/api/signup',CheckPassword ,signup)
 router.post('/api/login',validationMiddleware,login)
 router.get('/api/top', (req, res) => {
  // Check if headers object exists
  const headers = req.headers;
  const userAgentHeader = req.headers['user-agent'];

  try{
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization;
    return res.json(token);
   } else {         
     return res.status(401).send({ msg: "No authorization header provided" });
   }
  } catch(err){
      console.log(err)
      return res.status(500).send({msg:"Internal Server Error"})
  }
 })

  module.exports = router;