const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const User = require('./models/user')
const dbURI = 'mongodb://localhost/restaurant-db'

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (error, db) => {
    if (error) {
      return console.log(error)
    }
    console.log('Successfully connected to mongo!')
    db.dropDatabase()
      .then(() => {
        // Creates our users, then passes them down the chain
        return User.create([
          {
            "username": "ben",
            "email": "ben@ben",
            "password": "password",
            "passwordConfirmation": "password"
          },
          {
            "username": "denise",
            "email": "denise@denise",
            "password": "password",
            "passwordConfirmation": "password"
          },
          {
            "username": "emma",
            "email": "emma@emma",
            "password": "password",
            "passwordConfirmation": "password"
          },
          {
            "username": "subash",
            "email": "subash@subash",
            "password": "password",
            "passwordConfirmation": "password"
          }
        ])
      })
      .then(users => {
        return Restaurant.create([
          {
            "name": "SUSHISAMBA Covent Garden",
            "link": "https://www.sushisamba.com/locations/uk/london-covent-garden",
            "address": "35 The Market",
            "postcode": "WC2E 8RF",
            "telephone": "020 3053 0000",
            "bookingLink": "https://www.opentable.co.uk/r/sushisamba-covent-garden-london-2",
            "cuisine": ["Japanese"],
            "serveAlcohol": true,
            "veggieFriendly": true,
            "halalFriendly": false,
            "priceRange": 3,
            "user": users[1]
          }
        ])
      })
      .then(restaurants => console.log(`${'🥞'.repeat(restaurants.length)} created`))
      .then(() => console.log('Goodbye!'))
      .catch(err => console.log(err))
      .finally(() => mongoose.connection.close())
  })
