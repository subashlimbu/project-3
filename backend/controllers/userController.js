const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')
const Joi = require('@hapi/joi')
const passwordComplexity = require('joi-password-complexity') //validate password complexity in controller, instead of in database 


function register(req, res) {
  const validationResult = passwordComplexity().validate(req.body.password)
  console.log(validationResult.error.details[0].message)
  console.log(req.body)
  if (validationResult.error) {//this means there is error {
    return res.status(400).send({ errors: 'Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.' })
  }
  // console.log(passwordComplexity().validate(req.body.password))
  // console.log(passwordComplexity().validate(req.body.password).error)
  User
    .create(req.body)
    .then(user => {
      res.status(201).send(user)
    })
    .catch(error => res.send(error))
}


function login(req, res) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user || !user.validatePassword(req.body.password)) {
        return res.status(401).send({ message: 'Unauthorized' })
      }
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' })
      res.status(202).send({ message: `${user.username}`, token })
    })
    .catch(error => res.send(error))
}

function getProfile(req, res) {
  const user = req.currentUser
  res.status(202).send(user)
}

// function changePassword(req, res) {
//   User
//     // find the user
//     .findOne({ email: req.body.email })
//     // check the 
//     .then()

//   // get the user based on who is currently logged in
//   // check the email and currentPassword match - reject if not
//   // update password to newPassword
// }

// changepassword should receive email, currentPassword, newPassword
// function editARestaurant(req, res) {
//   const id = req.params.id
//   console.log('gets in here')
//   Restaurant
//     .findById(id)
//     .then(restaurant => {
//       if (!restaurant.user.equals(req.currentUser._id)) return res.status(401).send({ message: 'This restaurant does not belong to you! Please do not change other peopls restaurant' })
//       return restaurant.set(req.body)
//     })
//     .then(restaurant => {
//       return restaurant.save()
//     })
//     .then(restaurant => {
//       res.status(202).send(restaurant)
//     })
// }

module.exports = {
  register,
  login,
  getProfile
  // changePassword
}