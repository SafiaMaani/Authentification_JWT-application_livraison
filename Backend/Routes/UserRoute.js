const express = require('express')
// const {
//   VerifyUser
// } = require('../Controllers/AuthController')
const routerAuthorization = express.Router()
const {
  getUser
} = require('../Controllers/UserController')

//api/user/:role/me: PRIVATE
routerAuthorization.get(`/:role/me`, getUser)

module.exports = routerAuthorization