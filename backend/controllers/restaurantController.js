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


}


module.exports = {
  index,
  createNewRestaurant,
  deleteARestaurant,
  viewARestaurant,
  editARestaurant,
  CreateNewComment
}