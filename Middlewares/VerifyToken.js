const jwt = require('jsonwebtoken')

function auth(req, res, next) {
  const token = req.header("auth-token");
if(!token){
  return res.status(401).send("l'Acces n'est pas autorisé")
}
}

// //create and assign a token in login function
// const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
// res.header("auth-token",token).send(token)