const User = require('../Models/userModel')
const jwt = require('jsonwebtoken')



exports.getUser = async (req, res, next) => {
  const token = req.cookies.token
  let role = req.params.role
  if (!token) {
    return next({
      message: "Unauthorized",
      status: 401
    })
  }
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)

  if(role != decodedToken._roles){
    return next({
      message: "Forbiden! Votre role ne vous permis pas d'accéder à cette page",
      status: 403
    }) 
  }
    if (decodedToken._roles == "client") {
      return next({
        message: `Bienvenue ${decodedToken.first_name} ${decodedToken.last_name} dans votre ${decodedToken._roles} Profile`,
        status: 200
      })
    } 
    if (decodedToken._roles == "manager") {
      return next({
        message: `Bienvenue ${decodedToken.first_name} ${decodedToken.last_name} dans votre ${decodedToken._roles} Profile`,
        status: 200
      })
    } 
    if (decodedToken._roles == "livreur") {
      return next({
        message: `Bienvenue ${decodedToken.first_name} ${decodedToken.last_name} dans votre ${decodedToken._roles} Profile`,
        status: 200
      })
    }
 
}