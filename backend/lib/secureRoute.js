

const User = require('../models/user')
const { secret } = require('../config/environment')
const jwt = require('jsonwebtoken')


function secureRoute(req, res, next) {
  const authToken = req.headers.authorization
  // console.log(authToken)
  if (!authToken || !authToken.startsWith('Bearer')) {
    // if in here that means either no token at all or auth token doesn't start with bearer so bye 
    console.log('failed')
    return res.status(401).send({ message: 'No token provided or token does not start with Bearer! ' })
  }

  // if we get here we have a token that begins with 'Bearer' but don't know if it's definitely valid yet 
  const token = authToken.replace('Bearer ', '')

  // so we use jwt to help us check if the token user trying to give us is valid or not 
  // payload is the name of a section of the token where we added extra stuff like sub (Which is user._id)
  jwt.verify(token, secret, (err, payload) => {
    // If jwt verification fails will throw errow and re send 401 back + unauthorised message 
    if (err) return res.status(401).send({ message: 'Token starts with bearer but token is not valid!' })
    User
      // payload.sub is the user Id we stored on the token in userController when we generated the token for the user
      .findById(payload.sub)
      .then(user => {
        // If there's no user exists with the user.id, unauthorized, probably because user account is deleted?
        if (!user) return res.status(401).send({ message: 'Unauthorized, no user associated with this ID' })

        // if we get here it means we found user using the user ID and we can pinpoint exactly which user! 

        // Attach our user to our request, so that our routes can access the user
        req.currentUser = user //user is what we have  from line 27
        // console.log(req.currentUser)

        next()   // Finish this middleware, let express know we're done
      })
      .catch(() => res.status(401).send({ message: 'Unauthorized, catch error' }))
  })
}


module.exports = secureRoute


