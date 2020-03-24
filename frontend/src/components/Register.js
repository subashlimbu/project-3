import React from 'react'
import axios from 'axios'

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

  handleChange(event) {
    const { name, value } = event.target
    const data = { ...this.state.data, [name]: value }
    console.log(data)
    this.setState({ data })
  }

  handleSubmit(event) {
    event.preventDefault()
    axios.post('/api/register',
      this.state.data)
      .then(res => console.log(res))
      .then(() => this.props.history.push('/login'))
      .catch(error => this.setState({ errors: error.response.data.errors }))
  }

  render() {
    const { errors } = this.state
    return <section className="section">
      <div className="container">
        <h1 className="title">Register</h1>
        <form
          className="form"
          onSubmit={(event) => this.handleSubmit(event)}
        >
          <div className="field">
            <label className="label">
              Email
            </label>
            <div className="control">
              <input
                onChange={(event) => this.handleChange(event)}
                type="text"
                name="email"
                className="input"
              />
            </div>
            {errors.email && <small className="help is-danger">
              {errors.email}
            </small>}
          </div>

          <div className="field">
            <label className="label">
              Username
            </label>
            <div className="control">
              <input
                onChange={(event) => this.handleChange(event)}
                type="text"
                name="username"
                className="input"
              />
            </div>
            {errors.username && <small className="help is-danger">
              {errors.username}
            </small>}
          </div>

          <div className="field">
            <label className="label">
              Password
            </label>
            <div className="control">
              <input
                onChange={(event) => this.handleChange(event)}
                type="password"
                name="password"
                className="input"
              />
            </div>
            {errors.password && <small className="help is-danger">
              {errors.password}
            </small>}
          </div>

          <div className="field">
            <label className="label">
              Confirm your password
            </label>
            <div className="control">
              <input
                onChange={(event) => this.handleChange(event)}
                type="password"
                name="passwordConfirmation"
                className="input"
              />
            </div>
            {errors.passwordConfirmation && <small className="help is-danger">
              {errors.passwordConfirmation}
            </small>}
          </div>
          <button className="button is-success">
            Register
          </button>
        </form>
      </div>
    </section>
  }

}

export default Register