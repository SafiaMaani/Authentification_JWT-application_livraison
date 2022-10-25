const User = require('../Models/userModel')
const crypto = require("crypto")
const bcrypt = require('bcrypt')
let roles = ['client', 'manager', 'livreur']
const Role = require('../Models/roleModel')
const nodemailer = require('../Config/nodemailer.config')
const jwt = require('jsonwebtoken')

exports.register = async (req, res, next) => {
  let role = req.body.role;
  //I'll try to hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  if (!roles.includes(role)) {
    return next({
      message: "Merci de specifier un role qui existe dans notre l'application!",
      status: 400
    })
  }
  const {
    _id
  } = await Role.findOne({
    role
  })

  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: hashedPassword,
    _roles: [_id],
    verification_token: crypto.randomBytes(10).toString('hex')
  })

  try {
    const createdUser = await user.save()
    const link = `http//localhost:1000/api/user/ConfirmEmail/${user.verification_token}`
    nodemailer.confirmEmail(
      user.first_name,
      user.last_name,
      user.email,
      "Verification de votre compte",
      link
    )
    return next({
      message: "Nous vous avons envoyé un lien de confirmation de compte, Veuillez verifier votre email SVP!",
      status: 200
    })
  } catch (err) {
    if (err.code == 11000) {
      return next({
        message: "CET EMAIL EST DEJA UTILISE!",
        status: 400
      })
    } else {
      res.status(400).send(err)
    }
  }
}

exports.VerifyUser = (req, res, next) => {
  const user = User.findOne({
      verification_token: req.params.verification_token
    })
    .then((user) => {
      if (!user) {
        return next({
          message: "Cet utilisateur n'existe pas!",
          status: 400
        })
      } else {
        user.verified = true
        user.save()
        return next({
          message: "Utilisateur verifié",
          status: 200
        })
      }
    })
}

exports.login = async (req, res, next) => {

  const user = await User.findOne({
    email: req.body.email,
  })
  
  if (!user) {
    return next({
      message: 'Email ou Mot de passe incorrect!',
      status: 400
    })
  }
  //comparaison du psw hashedds la DB avec celui que l'utilisateur va entrer
  const dehashedPassword = await bcrypt.compare(req.body.password, user.password)
  if (!dehashedPassword) {
    return next({
      message: 'Le mot de passe est incorrect!',
      status: 400
    })
  }

  if (user.verified == false) {
    return next({
      message: "Vous n'avez pas encore confirmer votre compte",
      status: 400
    })
  }
  
  return next({
    message: "Connecté avec success",
    status: 200,
  })

}
exports.forgetPsw = (req, res) => {
  console.log('Forget Password page')
}
exports.resetPsw = (req, res) => {
  console.log('Reset Password page')
}