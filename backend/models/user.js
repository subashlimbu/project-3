const mongoose = require('mongoose')
const mongooseHidden = require('mongoose-hidden')() //to hide fields when we return info back to user after registration 
const { isEmail } = require('validator') //to validate email syntax
const { isValidPassword } = require('mongoose-custom-validators') //to validate password 
const passwordComplexity = require('joi-password-complexity')
const uniqueValidator = require('mongoose-unique-validator')


const bcrypt = require('bcrypt')

// const validateEmail = function (email) {
//   var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
//   return re.test(email)
// }

const schema = new mongoose.Schema({
  username: { type: String, required: [true, 'please enter a username'], unique: true },
  email: {
    type: String,
    required: [true, 'please enter an email address'],
    minLength: 8,
    unique: true,
    validate: [isEmail, 'please enter a valid email address']
    // validate: [validateEmail, 'Please fill a valid email address'],
    // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: [true, 'please enter a password'],
    hide: true
    // validator: isValidPassword, //doesn't work because it's validating the HASHED password which is a complex string that passes this test! 
    // message: 'Password must have at least: 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.'

  },
  favourites: [{ type: mongoose.Schema.ObjectId, ref: 'Restaurant', required: false }]

})

schema.plugin(uniqueValidator, { message: '{PATH} already exists' });
schema.plugin(mongooseHidden)

schema.
  virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

schema
  .pre('validate', function checkPassword(next) {
    // console.log(this._passwordConfirmation)
    // console.log(this.password)
    if (this.isModified('password')) {
      const validationResult = passwordComplexity().validate(this.password)
      if (validationResult.error) {
        this.invalidate('password', 'Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.')
      }
      if (this._passwordConfirmation !== this.password) {
        this.invalidate('passwordConfirmation', 'passwords should match')
      }
    }
    next()
  })

schema
  .pre('save', function hashPassword(next) {
    if (this.isModified('password')) { // If the password has been created or changed
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync()) // Encrypt the password
    }
    next()
  })

schema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', schema)
