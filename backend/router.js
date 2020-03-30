const router = require('express').Router()
const restaurantController = require('./controllers/restaurantController')
const userController = require('./controllers/userController')

// add secureRoute in front of private routes to activate middleware
const secureRoute = require('./lib/secureRoute')

router.route('/restaurants')
  .get(restaurantController.index) //tested and works 
  .post(secureRoute, restaurantController.createNewRestaurant) //tested and works for logged-in user 

router.route('/restaurant/:id')
  .get(restaurantController.viewARestaurant) //tested and works 
  .delete(secureRoute, restaurantController.deleteARestaurant) //tested and works for logged-in user who created that resto 
  .put(secureRoute, restaurantController.editARestaurant) //tested and works for logged-in user who created that resto 

router.route('/restaurant/:id/comments')
  .post(secureRoute, restaurantController.CreateNewComment) //tested and works for logged-in user 
  .get(restaurantController.getComments)


router.route('/restaurant/:id/comment/:commentId')
  .delete(secureRoute, restaurantController.DeleteAComment) //tested and works for logged-in user who created that comment 
  .put(secureRoute, restaurantController.EditAComment) //tested and works for logged-in user who created that comment 

//like and dislike toggles work but this is a tempory fix as I need to ask Nick about the requests/routes used for this
router.route('/restaurant/:id/comment/:commentId/like')
  .get(secureRoute, restaurantController.toggleLikeComment)

router.route('/restaurant/:id/comment/:commentId/dislike')
  .get(secureRoute, restaurantController.toggleDislikeComment)

router.route('/restaurant/:id/comment/:commentId/likes')
  .get(secureRoute, restaurantController.getLikeAndDislike)

router.route('/register')
  .post(userController.register)

router.route('/login')
  .post(userController.login)

router.route('/profile')
  .get(secureRoute, userController.getProfile)
  .put(secureRoute, userController.changePassword)

router.route('/random')
  .get(restaurantController.getRandomRestaurant)

module.exports = router