
const router = require('express').Router()
const restaurantController = require('./controllers/restaurantController')
const userController = require('./controllers/userController')

// add secureRoute in front of private routes to activate middleware
const secureRoute = require('./lib/secureRoute')


router.route('/restaurants')
  .get(restaurantController.index) //tested and works 
  .post(secureRoute, restaurantController.createNewRestaurant) //tested and works 

router.route('/restaurant/:id')
  .get(restaurantController.viewARestaurant) //tested and works 
  .delete(secureRoute, restaurantController.deleteARestaurant) //tested and works 
  .put(secureRoute, restaurantController.editARestaurant) //tested and works 

  // router.route('/restaurant/:id/comments')
  .post(secureRoute, restaurantController.CreateNewComment) //not yet written function createNewComment in restaurantController

// router.route('/restaurant/:id/comment/:commentId')
//   .delete(secureRoute, restaurantController.commentDelete)
//   .put(secureRoute, restaurantController.commentEdit)

router.route('/register')
  .post(userController.register)

router.route('/login')
  .post(userController.login)

module.exports = router