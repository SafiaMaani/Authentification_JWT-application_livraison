const nodeMailer = require('nodemailer')
const user = process.env.USER
const pass = process.env.PASSWORD

const transport = nodeMailer.createTransport({
  service: "Gmail",
  auth: {
    user,
    pass
  }
})

module.exports.confirmEmail = (first_name, last_name, email, subject, link) => {
  transport.sendMail({
    from: user,
    to: email,
    subject: `${subject}`,
    html: `<h1> Confirmation d'email </h1>
            <h2> Bonjour ${last_name} ${first_name}</h2>
              <p> Veuillez confirmer votre email en cliquant sur ce lien <a href=${link}> Click here</a></p>`
            
  }).catch(err => console.log(err))
}