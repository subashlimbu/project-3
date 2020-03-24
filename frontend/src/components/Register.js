import React from 'react'
// import axios from 'axios'

class Register extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {
        email: '',
        username: '',
        password: '',
        passwordConfirmation: ''
      },
      errors: {}
    }
  }


  render() {
    return <p>register for a good time!</p>
  }

}

export default Register