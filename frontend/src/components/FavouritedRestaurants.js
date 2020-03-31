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
    return <section className="section">
      <div className="container">

        <div className="columns is-centered is-mobile is-multiline">

          {this.state.favouritedRestos.map(restaurant => {
            return <div key={restaurant._id} className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
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
    </section>


  }
}

export default FavouritedRestaurants