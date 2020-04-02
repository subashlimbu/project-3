import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import auth from '../lib/auth'


class FavouritedRestaurants extends React.Component {
  constructor() {
    super()
    this.state = {
      favouritedRestos: null //array of fav restaurants, 
    }
  }

  componentDidMount() {
    axios.get('/api/favourites', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then((resp) => {
        console.log('gets in here')
        this.setState({
          favouritedRestos: resp.data
        })
      })
      .catch(err => console.error(err))
  }

  render() {
    if (!this.state.favouritedRestos) return 'Favourite some restaurants!'
    console.log(this.state)
    return <div className="page-background main-container">
      <div className="page-title">
        <h1 className="title">Favourited Restaurants</h1>
        <hr className="login-hr" />
      </div>
      <div className="columns is-full-mobile is-multiline is-centered mobile-padding">

        {this.state.favouritedRestos.map(restaurant => {
          return <div key={restaurant._id} className="column is-one-quarter-desktop is-one-third-tablet is-full-mobile">
            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={restaurant.image} alt="Placeholder image" className="resImage" />


                  <div className="card-content">
                    <Link className="subtitle" to={`/restaurant/${restaurant._id}`}>{restaurant.name}</Link>
                    <p className="subtitle">{restaurant.address}</p>
                  </div>
                </figure>
              </div>
            </div>
          </div>
        })}
      </div>
    </div>
  }
}

export default FavouritedRestaurants