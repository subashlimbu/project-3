import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import 'bulma'
import './styles/style.scss'

import Home from './components/Home'
import Restaurants from './components/Restaurants'
import SingleRestaurant from './components/SingleRestaurant'
import NavBar from './components/NavBar'
import Login from './components/Login'
import Register from './components/Register'

const App = () => (
  <BrowserRouter>
    <NavBar/>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/cheeses" component={Restaurants}/>
      <Route path="/cheese/:id" component={SingleRestaurant}/>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </Switch>
  </BrowserRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)