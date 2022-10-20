const client = require('../Models/ClientModel')
const crypto = require("crypto")

exports.register = async (req, res) => {
  // res.send('Register page')
  const clt = new client({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    image: req.body.image,
    verification_token: crypto.randomBytes(10).toString('hex')
  })
  try {
    const createdClt = await clt.save()
    res.send(createdClt)
  } catch (err) {
    res.status(400).send(err)
  }

}
exports.login = (req, res) => {
  res.send('Login page')
}
exports.forgetPsw = (req, res) => {
  console.log('Forget Password page')
}
exports.resetPsw = (req, res) => {
  console.log('Reset Password page')
}