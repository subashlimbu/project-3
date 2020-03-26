const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')
const Joi = require('@hapi/joi')
const passwordComplexity = require('joi-password-complexity') //validate password complexity in controller, instead of in database 


function register(req, res) {
  // const validationResult = passwordComplexity().validate(req.body.password)
  // if (validationResult.error) {//this means there is error {
  //   console.log('hi')
  //   return res.status(400).send({ errors: {password : 'Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.'} })
  // }
  User
    .create(req.body)
    .then(user => {
      res.status(201).send(user)
    })
    .catch(error => {
      console.log(error)
      // const errResponse = {}
      // errResponse[error.errors.email.path] = error.errors.email.message
      // // console.log((error.errors.email.path))
      res.status(401).send(error)
    })
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
    .catch(error => res.send({ errors: error.errors }))
}

function getProfile(req, res) {
  const user = req.currentUser
  res.status(202).send(user)
}



module.exports = {
  register,
  login,
  getProfile
}