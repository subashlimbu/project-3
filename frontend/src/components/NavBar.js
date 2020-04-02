import React from 'react'
import { Link } from 'react-router-dom'
import auth from '../lib/auth'
import { withRouter } from 'react-router-dom'
import { GiHotMeal } from 'react-icons/gi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faUtensils } from '@fortawesome/free-solid-svg-icons'

class NavBar extends React.Component {

  constructor() {
    super()
    this.state = {
      navMobileOpen: false
    }
  }

  handleLogout() {
    auth.logout()
    this.props.history.push('/')
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ navMobileOpen: false })
    }
  }

  render() {
    const isLoggedIn = auth.isLoggedIn()
    return <>
      <nav className="navbar is-black">
        <div className="container navbar-container">
          <div className="navbar-brand">
            <Link className="navbar-item foodtitle" to="/">
              <FontAwesomeIcon icon={faUtensils} /> 
            </Link>
            <a
              role="button"
              className={`navbar-burger burger ${this.state.navMobileOpen ? 'is-active' : ''}`}
              aria-label="menu"
              aria-expanded="false"
              onClick={() => this.setState({ navMobileOpen: !this.state.navMobileOpen })}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div className={`navbar-menu ${this.state.navMobileOpen ? 'is-active' : ''}`}>
            <div className="navbar-end">
              <div className="navbar-item">
                <Link className="navbar-edited" to="/restaurants">Restaurants</Link>
              </div>

              {isLoggedIn && <div className="navbar-item">
                <Link className="navbar-edited" to="/restaurant/new">Add a restaurant</Link>
              </div>}

              {!isLoggedIn && <div className="navbar-item">
                <Link className="navbar-edited" to="/register">Register</Link>
              </div>}

              {!isLoggedIn && <div className="navbar-item">
                <Link className="navbar-edited" to="/login">Login</Link>
              </div>}

              {isLoggedIn && <div className="navbar-item">
                <Link className="navbar-edited" to="/favourites">Favourites</Link>
              </div>}

              {isLoggedIn && <div className="navbar-item has-dropdown is-hoverable navbar-name">

                <div className="navbar-link">
                  <Link className="navbar-edited" to="/profile">{auth.getName()}</Link>
                </div>

                <div className="navbar-dropdown">
                  <div className="navbar-edited">
                    <div
                      onClick={() => this.handleLogout()}
                      className="navbar-item dropdown-item"
                    >
                      Log out
                    </div>
                  </div>
                </div>

              </div>}


            </div>
          </div>
        </div>
      </nav>

    </>
  }
}

export default withRouter(NavBar)
// will need to be withRouter in future