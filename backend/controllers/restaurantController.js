const Restaurant = require('../models/restaurant')


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


module.exports = {
  index,
  createNewRestaurant,
  deleteARestaurant,
  viewARestaurant,
  editARestaurant,
  CreateNewComment,
  EditAComment,
  DeleteAComment
}