const express = require('express')
const router = express.Router()
const auth = require("../controller/auth")
const {login,signup} = require("../controller/auth")
const {CheckPassword} = require("../middleware/auth")
const validationMiddleware = require('../middleware/validateMiddleware')
// const {router} = require("./authRoutes?")

 router.post('/api/signup',CheckPassword ,signup)
 router.post('/api/login',validationMiddleware,login)
//  router.get('/api/auth/user',router)

  module.exports = router;