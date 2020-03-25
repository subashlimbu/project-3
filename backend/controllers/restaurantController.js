const Restaurant = require('../models/restaurant')
const User = require('../models/user')

function index(req, res) {
  // Find all our pancakes (asynchronous!) and send them back when done
  Restaurant
    .find()
    .then(restaurants => {
      res.send(restaurants)
    })
}

function createNewRestaurant(req, res) {
  req.body.user = req.currentUser
  Restaurant
    .create(req.body) //create restaurant using the JSON body inside insomnia / frontend form 
    .then(restaurant => {
      res.status(201).send(restaurant)
    })
}

function viewARestaurant(req, res) {
  const id = req.params.id
  Restaurant
    .findById(id)
    .then(restaurant => {
      res.send(restaurant)
    })
}

function deleteARestaurant(req, res) {
  const id = req.params.id
  Restaurant
    .findById(id)
    .then(restaurant => { //restaurant is referring to that individual restaurant with that specific id
      if (!restaurant.user.equals(req.currentUser._id)) return res.status(401).send({ message: 'This restaurant does not belong to you! Please do delete other peoples restaurant' })
      return restaurant.remove() // at this point it would mean that this particular resto belongs to the user that is logged in, so we allow user to remove this resto 
    })
    .then(() => {
      res.status(204).send({ message: 'Restaurant deleted!' })
    })
}


function editARestaurant(req, res) {
  const id = req.params.id
  console.log('gets in here')
  Restaurant
    .findById(id)
    .then(restaurant => {
      if (!restaurant.user.equals(req.currentUser._id)) return res.status(401).send({ message: 'This restaurant does not belong to you! Please do not change other peopls restaurant' })
      return restaurant.set(req.body)
    })
    .then(restaurant => {
      return restaurant.save()
    })
    .then(restaurant => {
      res.status(202).send(restaurant)
    })
}

function CreateNewComment(req, res) {
  const currentUser = req.currentUser
  req.body.user = currentUser // really important line, this is essentially adding a user field to our req.body (in JSON left side in insomia)
  console.log('comment ', req.body)
  Restaurant
    .findById(req.params.id)
    .then(restaurant => {
      if (!restaurant) return res.status(404).send({ message: 'No restaurant with this ID, sadly.' })
      restaurant.comments.push(req.body)
      return restaurant.save()
    })
    .then(restaurant => res.status(201).send(restaurant))
    .catch(error => res.send(error))
}

function EditAComment(req, res) {
  const currentUser = req.currentUser
  Restaurant
    .findById(req.params.id)
    .then(restaurant => {
      if (!restaurant) return res.status(404).send({ message: 'No restaurant with this ID' })

      //at this point we have the specific resto, now get the comment I want to edit 
      const comment = restaurant.comments.id(req.params.commentId)

      //check if the comment is posted by the same person who is now trying to edit it 
      if (!comment.user.equals(currentUser._id)) {
        return res.status(401).send({ message: 'Do not edit others restaurants!' })
      }
      //at this point it would be the same person, so we want to update the resto with the new text (on left side in insomia, json body)
      comment.set(req.body)
      return restaurant.save()
    })
    .then(restaurant => res.status(200).send(restaurant))
    .catch(error => res.send(error))

}

function DeleteAComment(req, res) {
  const currentUser = req.currentUser
  Restaurant
    // id refers to the resto ID that the comment lives on
    .findById(req.params.id)
    .then(restaurant => {
      if (!restaurant) return res.status(404).send({ message: 'No restaurant with this ID' })
      // get the comment that I need to delete. We get it using the id method of mongoose 
      const comment = restaurant.comments.id(req.params.commentId)
      if (!comment.user.equals(currentUser._id)) {
        return res.status(401).send({ message: 'Do not delete other peoples restaurant!' })
      }
      // Mongoose Remove method to delete that comment
      comment.remove()
      return restaurant.save()
    })
    .then(restaurant => res.status(202).send(restaurant)) //send back the resto
    .catch(error => res.send(error))
}

function getLikeAndDislike(req, res) {
  Restaurant
    // id refers to the resto ID that the comment lives on
    .findById(req.params.id)
    .then(restaurant => {
      if (!restaurant) return res.status(404).send({ message: 'No restaurant with this ID' })
      // get the comment that I need to delete. We get it using the id method of mongoose 
      console.log((restaurant.comments.id(req.params.commentId)))
      return restaurant.comments.id(req.params.commentId)
    })
    .then(comment => {
      const currentUser = req.currentUser
      return res.send({
        isLiked: comment.likedBy.includes(currentUser._id),
        isDisliked: comment.dislikedBy.includes(currentUser._id)
      })
    })
    .catch(err => console.log(err))
}

//LIKES AND DISLIKES: this is temporary for the moment, unsure if this is the best possible implementation
//it works though
//need to add functionality to not allow user to like if they've disliked already and vice versa.

function toggleLikeComment(req, res) {
  //get current user from request
  const currentUser = req.currentUser
  Restaurant
    //find the restaurant from request
    .findById(req.params.id)
    .then(restaurant => {
      if (!restaurant) return res.status(404).send({ message: 'No restaurant with this ID' })
      //get the comment from request
      const comment = restaurant.comments.id(req.params.commentId)
      //if the user has liked the comment then remove them from the likes otherwise add them to the likes
      if (comment.likedBy.includes(currentUser._id)) {
        comment.likedBy.splice(comment.likedBy.indexOf(currentUser._id, 1))
      } else {
        //if they are in the dislikedBy array the remove them
        if (comment.dislikedBy.includes(currentUser._id)) {
          comment.dislikedBy.splice(comment.dislikedBy.indexOf(currentUser._id, 1))
        }
        comment.likedBy.push(currentUser._id)
      }
      return restaurant.save()
    })
    .then(restaurant => {
      const currentUser = req.currentUser
      const comment = restaurant.comments.id(req.params.commentId)
      //return a boolean telling the front end if the user has liked the comment or not
      //this can be used for a button graphic to be filled in or not depending on if the user has liked the comment or not
      res.status(200).send({
        isLiked: comment.likedBy.includes(currentUser._id),
        isDisliked: comment.dislikedBy.includes(currentUser._id)
      })
    })
    .catch(err => res.send({ error: err }))
}

//repeat the above logic for dislikedBy
function toggleDislikeComment(req, res) {
  const currentUser = req.currentUser
  Restaurant
    .findById(req.params.id)
    .then(restaurant => {
      if (!restaurant) return res.status(404).send({ message: 'No restaurant with this ID' })
      const comment = restaurant.comments.id(req.params.commentId)
      if (comment.dislikedBy.includes(currentUser._id)) {
        comment.dislikedBy.splice(comment.dislikedBy.indexOf(currentUser._id, 1))
      } else {
        if (comment.likedBy.includes(currentUser._id)) {
          comment.likedBy.splice(comment.likedBy.indexOf(currentUser._id, 1))
        }
        comment.dislikedBy.push(currentUser._id)
      }
      return restaurant.save()
    })
    .then(restaurant => {
      const currentUser = req.currentUser
      const comment = restaurant.comments.id(req.params.commentId)
      res.status(200).send({ 
        isLiked: comment.likedBy.includes(currentUser._id),
        isDisliked: comment.dislikedBy.includes(currentUser._id)
      })
    })
    .catch(err => res.send({ error: err }))
}

function getComments(req, res) {
  console.log(req)
  Restaurant
    .findById(req.params.id)
    .populate('comments.user').exec()
    .then(restaurant => {
      return res.send(restaurant.comments)
    })
    .catch(err => res.send({ error: err }))
}

module.exports = {
  index,
  createNewRestaurant,
  deleteARestaurant,
  viewARestaurant,
  editARestaurant,
  CreateNewComment,
  EditAComment,
  DeleteAComment,
  toggleLikeComment,
  toggleDislikeComment,
  getComments,
  getLikeAndDislike
}