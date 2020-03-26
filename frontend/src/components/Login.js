import React from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'



import auth from '../lib/auth'

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

  handleChange(event) {
    const { name, value } = event.target
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
  }

  handleSubmit(event) {
    event.preventDefault()
    axios.post('/api/login',
      this.state.data)
      .then(response => {
        const token = response.data.token
        const name = response.data.message
        auth.setToken(token)
        auth.setName(name)
        // console.log(response)
        // console.log(name)
        this.props.history.push('/')
      })
      .catch(error => this.setState({ error: error.response.data.message }))
  }

  render() {
    const { error } = this.state
    return <section className="hero is-success is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="column is-4 is-offset-4">
            <h1 className="title">Login</h1>
            <hr className="login-hr" />
            <p className="subtitle">Please login to proceed.</p>
            <div className="box">
              <figure className="avatar">
                <img src="https://www.astleypark.lancs.sch.uk/images/blog/welcome-back.jpg" />
              </figure>
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
                  {error && <small className="help is-danger">
                    {error}
                  </small>}
                </div>

                <button className="button is-success is-block is-large is-fullwidth">

                  Login
                  <FontAwesomeIcon icon={faSignInAlt} />
                  {/* <FontAwesomeIcon icon={faThumbsUp} /> */}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  }
}

export default Login