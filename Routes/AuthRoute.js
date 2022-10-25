const express = require('express')
const routerAuth = express.Router()
const {
     //here, we require the methods :
     register,
     login,
     forgetPsw,
     resetPsw,
     VerifyUser
} = require("../Controllers/AuthController")

routerAuth.post('/login', login)

routerAuth.post('/register', register)

routerAuth.get('/ConfirmEmail/:verification_token', VerifyUser)

routerAuth.get('/forgetPsw', (req, res, next) => {
     forgetPsw(req, res)
     res.send("It's the <strong> FORGET PSW </strong> page")
})

routerAuth.get('/resetPsw', (req, res) => {
     resetPsw(req, res)
     res.send("It's the <strong> RESET PSW </strong> page")
})

module.exports = routerAuth