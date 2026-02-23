const express = require('express')

const authRouter = express.Router()

const authcontroller = require("../controllers/auth.controller")
const { response } = require('../app')


authRouter.post('/register',authcontroller.registercontroller)




authRouter.post("/login",authcontroller.logincontroller)


module.exports = authRouter
 