const express = require('express')
const router = express.Router()
const auth = require("../controller/auth")
const {login,signup} = require("../controller/auth")
const {CheckPassword} = require("../middleware/auth")


 router.post('/api/signup',CheckPassword,signup)
 router.post('/api/login',login)

  module.exports = router;