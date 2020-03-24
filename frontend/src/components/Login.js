import React from 'react'
// import axios from 'axios'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {
        email: '',
        password: ''
      },
      error: ''
    }
  }
  render() {
    return <p>lets get logged in!</p>
  }
}

export default Login