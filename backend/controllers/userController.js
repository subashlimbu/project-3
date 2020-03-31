const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')
const Joi = require('@hapi/joi')
const passwordComplexity = require('joi-password-complexity') //validate password complexity in controller, instead of in database 


function register(req, res) {
  // console.log(passwordComplexity().validate(req.body.password))
  // console.log(passwordComplexity().validate(req.body.password).error)
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

function changePassword(req, res) {
  const user = req.currentUser._id

  User
    .findById(user)
    .then(user => {
      return user
    })
    .then(user => {
      if (!user.validatePassword(req.body.oldPassword)) {
        return res.status(401).send({ passwordValidation: { message: 'Wrong password' } })
      }
      user.set({ password: req.body.newPassword, passwordConfirmation: req.body.passwordConfirmation })
      return user.save(function(error, user) {
        if (error) {
          console.log('line 64 error', error.errors)
          return res.status(401).send(error.errors)
        } 
        return res.sendStatus(200)
      })
    })
    // .catch(error => {
    //   console.log('line 71', Object.entries(error)[0])
    //   res.status(401).send(error)
    // })

    // // check newPassword and passwordConfirmation match, and throw error if not
    // // check password fits criteria and reject if not

    // .then(user => {
    //   const validationResult = passwordComplexity().validate(req.body.newPassword)
    //   if (validationResult.error) {
    //     return res.send('Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.' )
    //   }
    //   if (req.body.passwordConfirmation !== req.body.newPassword) {
    //     return res.send('passwords should match' )
    //   }
    //   return user
    // })

    // .then(user => {
    //   // user.password = req.body.newPassword
    //   // user.passwordConfirmation = req.body.passwordConfirmation
    //   user.set({ password: req.body.newPassword, passwordConfirmation: req.body.passwordConfirmation })
    //   console.log('hello', user.password)
    //   user.save()
    //   return res.send('password change successful' )
    // })
    // // .then(user => res.status(200).send(user))
    // .catch(error => console.log(error))
}

function favourite(req, res) {
  const user = req.currentUser

  // try {

  //   User
  //     .findOneAndUpdate(user, { $push: { favourites: { _id: req.body.restaurantId } } })
  //     .then(user => console.log(user))
  // } catch (e) {
  //   console.log(e)
  // }


  User
    .findOne(user)
    .then(user => {
      // console.log(req.body.restaurantId)
      user.favourites.push(req.body.restaurantId) //make sure i name it restuarantId when i axios.post in frontend
      // console.log(user)
      user.save()
      res.status(200).send({ message: 'added restaurant to user favourites field/array' })
    })
    .catch(error => res.send({ errors: error.errors })) //unsure of this 


}

function unfavourite(req, res) {
  const user = req.currentUser
  User
    .findOne(user)
    .then(user => {
      user.favourites.pull(req.body.restaurantId)
      console.log(user)
      user.save()
      res.status(200).send({ message: 'removed restaurant from users favourites array' })
    })

}

module.exports = {
  register,
  login,
  getProfile,
  changePassword,
  favourite,
  unfavourite
}