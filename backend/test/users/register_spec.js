/* global describe, beforeEach, afterEach, it, expect, api */
const User = require('../../models/User')

const testUserCorrect = {
  username: 'denise1',
  email: 'denise1@denise.com',
  password: 'Password1!',
  passwordConfirmation: 'Password1!'
}

const testUserIncorrect = {
  username: 'denise3',
  email: 'denise3@denise.com',
  password: 'Password1!',
  passwordConfirmation: 'Password1'
}

describe('POST /register', () => {
  beforeEach(done => { //why do we need to create a user then delete it in line 29
    User.create({
      username: 'denise09',
      email: 'denise09@denise.com',
      password: 'Password9!',
      passwordConfirmation: 'Password9!'
    }).then(() => done())
  })

  afterEach(done => {
    User.deleteMany()
      .then(() => done())
  })

  it('should return a 201 response if request is valid', done => {
    api.post('/api/register')
      .send(testUserCorrect)
      .end((err, res) => {
        expect(res.status).to.eq(201)
        done()
      })
  })

  it('should return a 401 response if password !== passwordConfirmation', done => {
    api.post('/api/register')
      .send(testUserIncorrect)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })
})
