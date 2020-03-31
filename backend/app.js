const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const router = require('./router')
// const uri = 'mongodb://localhost/restaurant-db'
const uri = 'mongodb+srv://benharris:Password-1@cluster0-kzea4.mongodb.net/restaurantdb?retryWrites=true&w=majority';
const path = require('path')

const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const methodOverride = require('method-override')
const crypto = require('crypto')


mongoose.connect(uri,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) console.log(err)
    else console.log('Mongoose connected!')
  })

const connection = mongoose.connection
let gfs;

//initialised grid file system stream with mongoose
connection.once('open', function () {
  gfs = Grid(connection.db, mongoose.mongo)
  gfs.collection('images')
})

// creates a storage format for files being uploaded using gridfs
var storage = new GridFsStorage({
  //url of the mongodb being uploaded to
  url: uri,
  //the file from the request
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      //random name for the file
      crypto.randomBytes(16, (err, buf) => {
        //reject request if error
        if (err) {
          console.log(err)
          return reject(err)
        }
        //set the filename
        const filename = buf.toString('hex') + path.extname(file.originalname)
        //set the file data
        const fileInfo = {
          //set file name into the actual file
          filename: filename,
          //set the collection in mongodb to add file to
          bucketName: 'images',
          testKey: 'hi'
        }
        //complete promise if the program gets here
        resolve(fileInfo)
      })
    })
  }
})

//sets the storage as config for multer
//multer deals with form data inputs as api requests
const upload = multer({ storage })

const expressServer = express()

//takes an array of files
//upload refers to the multer object which, with the config storage defined earlier, has already added the images to the mongodb
expressServer.post('/api/upload', upload.array('image'), (req, res) => {
  // res.send({ files: req.files.map(file => file.id) })
  res.send({ files: req.files })
})


expressServer.use(bodyParser.json())

expressServer.use((req, res, next) => {
  console.log(`Incoming ${req.method} to ${req.url}`)
  next()
})

expressServer.use('/api', router)


expressServer.listen(8000)