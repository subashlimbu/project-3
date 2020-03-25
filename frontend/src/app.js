import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import 'bulma'
import './style.scss'

import Home from './components/Home'
import Restaurants from './components/Restaurants'
import SingleRestaurant from './components/SingleRestaurant'
import NavBar from './components/NavBar'
import Login from './components/Login'
import Register from './components/Register'
import AddRestaurant from './components/AddRestaurant'

const App = () => (
  <BrowserRouter>
    <NavBar/>
    <Switch>
      <Route exact path="/restaurant/new" component={AddRestaurant} />
      <Route exact path="/" component={Home}/>
      <Route exact path="/restaurants" component={Restaurants}/>
      <Route path="/restaurant/:id" component={SingleRestaurant}/>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </Switch>
  </BrowserRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)