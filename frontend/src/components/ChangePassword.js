import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'

class changePassword extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {
        oldPassword: '',
        newPassword: '',
        passwordConfirmation: ''
      },
      errors: ''
    }
  }

  handleChange(event) {
    const { name, value } = event.target
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
  }

  handleSubmit(event) {
    event.preventDefault()
    axios.put('/api/profile',
      this.state.data,
      { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          return this.props.history.push('/profile')
        }
      })
      .catch(error => {
        this.setState({ errors: error.response.data })
        console.log('line 42', error.response.data)
      })
  }

  render() {

    const { errors } = this.state
    return <>
      <section className="section">
        <div className="container">
          <h1 className="title">Change your password</h1>
          <form
            className="form"
            onSubmit={(event) => this.handleSubmit(event)}
          >
            <div className="field">
              <label className="label">
                Current Password
              </label>
              <div className="control">
                <input
                  onChange={(event) => this.handleChange(event)}
                  // type="password"
                  type="text"
                  name="oldPassword"
                  className="input"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">
                New Password
              </label>
              <div className="control">
                <input
                  onChange={(event) => this.handleChange(event)}
                  // type="password"
                  type="text"
                  name="newPassword"
                  className="input"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">
                Confirm New Password
              </label>
              <div className="control">
                <input
                  onChange={(event) => this.handleChange(event)}
                  // type="password"
                  type="text"
                  name="passwordConfirmation"
                  className="input"
                />
              </div>
            </div>


            <button className="button is-success">
              Change password
            </button>
            {errors.password && <small className="help is-danger">
              {errors.password.message}
            </small>}
            {errors.passwordConfirmation && <small className="help is-danger">
              {errors.passwordConfirmation.message}
            </small>}
            {errors.passwordValidation && <small className="help is-danger">
              {errors.passwordValidation.message}
            </small>}
          </form>
        </div>
      </section>
    </>
  }
}
export default changePassword