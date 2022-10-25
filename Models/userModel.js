const mongoose = require("mongoose");

const UserModel = mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Please add your first name"],
    trim: true,
  },
  last_name: {
    type: String,
    required: [true, "Please add your last name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please add your email"],
    unique: true,
    trim: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please add your password"],
    minlength: 6,
    trim: true,
  },
  phoneNumber: {
    type: String,
    match: /(\+212|0)([ \-_/]*)(\d[ \-_/]*){9}/,
  },
  adresse: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verification_token: {
    type: String,
    unique: true,
  },
  _roles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  }, ],
}, {
  timestamps: true,
})

module.exports = mongoose.model('user', UserModel);