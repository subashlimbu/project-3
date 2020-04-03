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
    return <>
      <div className="profile-page">

        <div className="page-background main-container">
          <div className="page-title">
            <h1 className="title defaultfont">Your profile</h1>
            <hr className="login-hr" />
          </div>

          <div className="columns is-full-mobile is-multiline is-centered mobile-padding">
            <div className="columns is-centered">

              <div className="column is-half flexparent">
                <img className="profile-image" src="https://s3.amazonaws.com/37assets/svn/765-default-avatar.png" />
              </div>

              <div className="column is-half flexparent">
                <div className="profile-box">
                  <p className="profile-text"> Username: {username} </p>
                  <p className="profile-text"> Email: {email} </p>
                  <button
                    className="randombutton profile-text"
                  >
                    <Link to={'/profile/changePassword'} className="randombutton">
                      Change password
                    </Link>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </>
  }

}
export default Profile 