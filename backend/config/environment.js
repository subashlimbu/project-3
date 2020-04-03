//environment variables used and shared throughout the app 

const port = process.env.PORT || 8000;
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/restaruant-db'
const secret = 'This is our top secret restaurant app'

module.exports = {
  secret,
  port,
  dbURI
}


