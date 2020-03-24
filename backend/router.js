
const router = require('express').Router()
const restaurantController = require('./controllers/restaurantController')
const userController = require('./controllers/userController')

// add secureRoute in front of private routes to activate middleware
const secureRoute = require('./lib/secureRoute')


router.route('/restaurants')
  .get(restaurantController.index)
  .post(secureRoute, restaurantController.create)

router.route('/restaurant/:id')
  .get(restaurantController.getSingle)
  .delete(secureRoute, restaurantController.remove)
  .put(secureRoute, restaurantController.edit)

router.route('/restaurant/:id/comments')
  .post(secureRoute, restaurantController.commentCreate)

router.route('/restaurant/:id/comment/:commentId')
  .delete(secureRoute, restaurantController.commentDelete)
  .put(secureRoute, restaurantController.commentEdit)

router.route('/register')
  .post(userController.register)

router.route('/login')
  .post(userController.login)

module.exports = router