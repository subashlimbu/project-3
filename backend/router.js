
const router = require('express').Router()
const restaurantController = require('./controllers/restaurantController')
const userController = require('./controllers/userController')

// add secureRoute in front of private routes to activate middleware
const secureRoute = require('./lib/secureRoute')


router.route('/restaurants')
  .get(restaurantController.index)
  .post(secureRoute, restaurantController.createNewRestaurant)

router.route('/restaurant/:id')
  .get(restaurantController.viewARestaurant)
  .delete(secureRoute, restaurantController.deleteARestaurant)
  .put(secureRoute, restaurantController.editARestaurant)

// router.route('/restaurant/:id/comments')
//   .post(secureRoute, restaurantController.CreateNewComment)

// router.route('/restaurant/:id/comment/:commentId')
//   .delete(secureRoute, restaurantController.commentDelete)
//   .put(secureRoute, restaurantController.commentEdit)

router.route('/register')
  .post(userController.register)

router.route('/login')
  .post(userController.login)

module.exports = router