import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Auth from '../lib/auth'

// Create a secure route you can only see when logged in
const SecureRoute = (props) => {
  if (Auth.isAuthenticated()) return <Route {...props} />
  Auth.logout()
  return <Redirect to="/login" />
}
export default SecureRoute