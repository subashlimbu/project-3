import React from 'react'
import { Link } from 'react-router-dom'

// this will definitely need quite an overhaul in future
// for now it is a functional component as it's just doing basic display
// will become a classical component so that we can change display when logged in

const NavBar = () => {
  return <>
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">Home</Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <Link className="navbar-item" to="/restaurants">Restaurants</Link>
          </div>
          <div className="navbar-item">
            <Link className="navbar-item" to="/register">Register</Link>
          </div>
          <div className="navbar-item">
            <Link className="navbar-item" to="/login">Login</Link>
          </div>
        </div>

      </div>
    </nav>

  </>
}

export default NavBar
// will need to be withRouter in future