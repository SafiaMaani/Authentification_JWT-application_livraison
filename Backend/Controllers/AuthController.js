const User = require('../Models/userModel')
const crypto = require("crypto")
const bcrypt = require('bcrypt')
let roles = ['client', 'manager', 'livreur']
const Role = require('../Models/roleModel')
const nodemailer = require('../Config/nodemailer.config')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')

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
    console.log(user);
    user.save()
    const link = `http://localhost:1000/api/auth/ConfirmEmail/${user.verification_token}`
    nodemailer.confirmEmail(
      user.first_name,
      user.last_name,
      user.email,
      "Verification de votre compte",
      link
    )
    return next({
      message: "Email de verification envoyé, Veuillez verifier votre email SVP!",
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
  User.findOne({
    verification_token: req.params.verification_token
  }, (error, user) => {
    if (error || !user) {
      return res.json({
        message: "Cet utilisateur n'existe pas!",
        status: 400
      })
    }
    user.verified = true
    user.save()
    return res.json({
      message: "Utilisateur verifié",
      status: 200
    })
  })

}

exports.login = async (req, res, next) => {

  const user = await User.findOne({
    email: req.body.email,
  }).populate('_roles')

  if (!user) {
    return next({
      message: 'Email ou Mot de passe incorrect!',
      status: 400
    })
  }
  //comparaison du psw hashed ds la DB avec celui que l'utilisateur va entrer
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
  //create and assign a token in login function
  const token = jwt.sign({
    _id: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    _roles: user._roles.role
  }, process.env.TOKEN_SECRET)
  res.cookie("token", token)

  return res.status(200).json({
    user,
    message: "Connecté",
    status: 200
  })
}
exports.forgetpassword = (req, res) => {

  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (err || !user)
      return res.status(400).json({
        message: "Cet utilisateur n'existe pas!"
      })
    const token = jwt.sign({
      _id: user._id
    }, process.env.TOKEN_SECRET, {
      expiresIn: 600
    })
    user.verification_token = token

    user.save().then(() => {
      const link = `http://localhost:3000/resetpassword/${user.verification_token}`
      nodemailer.confirmEmail(
        user.first_name,
        user.last_name,
        user.email,
        "Réintialisation de mot de passe",
        link
      )
    }).then(() =>
      res.status(200).json({
        message: 'On vous a envoyé un email de Réinitialisation de mot de passe'
      }))
  })
}
exports.resetpassword = (req, res) => {
  const myToken = req.params.token
  const payload = jwt.decode(myToken, process.env.TOKEN_SECRET)

  User.findById(payload._id, async (err, user) => {
    if (err || !user)
      return res.status(400).json({
        message: 'Cet utilisateur n_existe pas!'
      })
    if (myToken == user.verification_token) {
      const newPsw = req.body.password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(newPsw, salt)
      user.password = hashedPassword
      user.save().then(res.status(200).json({
        message: 'le mot de passe a été modifié avec succés!'
      }))
    }
  })
}