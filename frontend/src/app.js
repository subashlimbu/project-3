import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import 'bulma'
import './styles/style.scss'

import Home from './components/Home'
import Restaurants from './components/Restaurants'
import SingleRestaurant from './components/SingleRestaurant'
import NavBar from './components/NavBar'

const App = () => (
  <BrowserRouter>
    <NavBar/>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/cheeses" component={Restaurants}/>
      <Route path="/cheese/:id" component={SingleRestaurant}/>
    </Switch>
  </BrowserRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)