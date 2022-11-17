const express = require('express')
const routerAuth = express.Router()
const {
     //here, we require the methods :
     register,
     login,
     forgetpassword,
     resetpassword,
     VerifyUser
} = require("../Controllers/AuthController")

// api/auth/register: PUBLIC
routerAuth.post('/register', register)

// api/auth/login: PUBLIC
routerAuth.post('/login', login)

// api/user/ConfirmEmail/:verification_token: PUBLIC
routerAuth.get('/ConfirmEmail/:verification_token', VerifyUser)

// api/auth/forgetpassword: PUBLIC
routerAuth.post('/forgetpassword', forgetpassword)

// api/auth/resetpassword: PUBLIC
routerAuth.post('/resetpassword/:token', resetpassword)

module.exports = routerAuth