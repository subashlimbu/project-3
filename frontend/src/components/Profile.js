import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'
import { Link } from 'react-router-dom'


class Profile extends React.Component {
  constructor() {
    super()
    this.state = {
      profile: null
    }
  }

  componentDidMount() {
    axios.get('/api/profile', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      // .then((resp) => console.log(resp))
      .then((resp) => this.setState({
        profile: resp.data
      }))
      .catch(err => console.error(err))
  }


  render() {
    if (!this.state.profile) {
      return <h1> Still getting profile </h1>
    }
    const { username, email } = this.state.profile
    return <div className="profile-page">
      <div className="columns is-centered">
        <div className="column is-half flexparent">
          <h2 className="title is-centered"> Your Profile </h2>
          <img className="profile-image" src="https://s3.amazonaws.com/37assets/svn/765-default-avatar.png" />
          {/* <button
            onClick={() => this.handleDelete()}
            className="button is-danger">
            {'Delete Account (Are you sure?) [This button DOES NOT WORK] '}
          </button> */}
          <section className="section">
            <div className="container">
              <p className=""> Username: {username} </p>
              <p className=""> Email: {email} </p>
            </div>
          </section>
          <section className="section">
            <div className="container">
              <button
                className="button is-warning"
              >
                <Link to={'/profile/changePassword'}>
                  Change password
                </Link>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>

  }

}
export default Profile 