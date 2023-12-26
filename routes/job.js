const express = require('express')
const router = express.Router()
const UserModel = require("../model/user")
const auth = require("../controller/auth")
const {checkAuthentication} = require("../middleware/auth")

const {fetchJob,createJob,updateJob,deleteJob} = require("../controller/job")

router.get('/api/jobs',fetchJob)

router.post('/api/jobs',checkAuthentication,createJob) 
router.put('/api/jobs/:id',checkAuthentication,updateJob) 
router.put('/api/jobs/:id',checkAuthentication,deleteJob)   

module.exports = router;