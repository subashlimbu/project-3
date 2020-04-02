const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({ //how come don't need 'new mongoose.Schema' 🤷‍♂️
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  likedBy: [{ type: mongoose.Schema.ObjectId, ref: 'User', required: false }],
  dislikedBy: [{ type: mongoose.Schema.ObjectId, ref: 'User', required: false }] 
}, {
  timestamps: true
});

const restaurantSchema = mongoose.Schema({
  name: { type: String, required: true },
  link: { type: String, required: false },
  address: { type: String, required: true },
  postcode: { type: String, required: true },
  telephone: { type: String, required: true },
  bookingLink: { type: String, required: false },
  cuisine: { type: Array, required: true },
  serveAlcohol: { type: Boolean, required: false },
  veggieFriendly: { type: Boolean, required: false },
  halalFriendly: { type: Boolean, required: false },
  priceRange: { type: Number, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [commentSchema],
  image: { type: String, required: false },
  imageGallery: { type: Array, required: false }
});



module.exports = mongoose.model('Restaurant', restaurantSchema);