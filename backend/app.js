const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const router = require('./router')
// const uri = 'mongodb://localhost/restaurant-db'
const uri = 'mongodb+srv://benharris:Password-1@cluster0-kzea4.mongodb.net/restaurantdb?retryWrites=true&w=majority';


mongoose.connect(uri,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) console.log(err)
    else console.log('Mongoose connected!')
  })

const expressServer = express()


expressServer.use(bodyParser.json())

expressServer.use((req, res, next) => {
  console.log(`Incoming ${req.method} to ${req.url}`)
  next()
})

expressServer.use('/api', router)



expressServer.listen(8000)