/* global describe, beforeEach, afterEach, it, expect, api */
const User = require('../../models/user')
const Restaurant = require('../../models/restaurant')

describe('GET /restaurants', () => {

  beforeEach(done => {
    User.create({
      username: 'denise02',
      email: 'denise02@denise.com',
      password: 'Password1!',
      passwordConfirmation: 'Password1!'
    })
      .then(user => {
        Restaurant.create([
          {
            name: 'Sushi Atelier',
            link: 'https://www.sushiatelier.co.uk/',
            address: '114 Great Portland St',
            postcode: 'W1W 6PA',
            telephone: '020 7636 4455',
            bookingLink: 'https://www.resdiary.com/SushiAtelier',
            cuisine: ['Japanese'],
            serveAlcohol: true,
            veggieFriendly: true,
            halalFriendly: false,
            priceRange: 3,
            user, // think so?? 
            image: 'https://media-cdn.tripadvisor.com/media/photo-s/0f/f7/c3/a9/saba-nigiri.jpg'
          },
          {
            name: 'Rasa',
            link: 'http://rasarestaurants.com/rasa-n16/',
            address: '55 Stoke Newington Church St',
            postcode: 'N16 0AR',
            telephone: '020 7249 0344',
            bookingLink: 'http://rasarestaurants.com/reservation/rasa_n16.php',
            cuisine: ['Indian'],
            serveAlcohol: true,
            veggieFriendly: true,
            priceRange: 2,
            user, //think so?? 
            image: 'https://media-cdn.tripadvisor.com/media/photo-s/0e/f1/f2/fa/plantain-poppadoms-and.jpg'

          }])
          .then(() => done())
      })

  })

  afterEach(done => {
    User.deleteMany()
      .then(() => Restaurant.deleteMany())
      .then(() => done())
  })

  it('should return a 200 response restaurant', done => {
    api.get('/api/restaurants')
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })


  it('should return a restaurant array', done => {
    api.get('/api/restaurants')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        done()
      })
  })


})
