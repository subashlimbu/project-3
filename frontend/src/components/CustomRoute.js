import React from 'react'
import { Route } from 'react-router-dom'
import Auth from '../lib/auth'
const CustomRoute = (props) => {
  if (!Auth.isAuthenticated()) Auth.logout() //logs you out if you're not authenticated
  return <Route {...props} />
}
export default CustomRoute


