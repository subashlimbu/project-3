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
      username: 'denise02',
      email: 'denise02@denise.com',
      password: 'Password1!',
      passwordConfirmation: 'Password1!'
    }).then(() => done())
  })

  afterEach(done => {
    User.deleteMany()
      .then(() => done())
  })

  it('should return a 200 response if request is valid', done => {
    api.post('/api/register')
      .send(testUserCorrect)
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return a 422 response if password !== passwordConfirmation', done => {
    api.post('/api/register')
      .send(testUserIncorrect)
      .end((err, res) => {
        expect(res.status).to.eq(422)
        done()
      })
  })
})
