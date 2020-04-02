import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import 'bulma'
import './style.scss'
import auth from './lib/auth'
import SecureRoute from './components/SecureRoute'
import CustomRoute from './components/CustomRoute'


import Home from './components/Home'
import Restaurants from './components/Restaurants'
import SingleRestaurant from './components/SingleRestaurant'
import NavBar from './components/NavBar'
import Login from './components/Login'
import Register from './components/Register'
import AddRestaurant from './components/AddRestaurant'
import Profile from './components/Profile'
import FavouritedRestaurants from './components/FavouritedRestaurants'
import ChangePassword from './components/ChangePassword'

const App = () => (
  <BrowserRouter>
    <NavBar />
    <Switch>
      <SecureRoute exact path="/restaurant/new" component={AddRestaurant} />
      <CustomRoute exact path="/" component={Home} />
      <CustomRoute exact path="/restaurants" component={Restaurants} />
      <CustomRoute path="/restaurant/:id" component={SingleRestaurant} />
      <CustomRoute exact path="/login" component={Login} />
      <CustomRoute exact path="/register" component={Register} />
      <SecureRoute exact path="/profile" component={Profile} />
      <SecureRoute exact path="/favourites" component={FavouritedRestaurants} />
      <SecureRoute exact path="/profile/changePassword" component={ChangePassword} />


    </Switch>
  </BrowserRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)