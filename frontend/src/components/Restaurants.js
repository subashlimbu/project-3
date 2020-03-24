import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'


class Restaurants extends React.Component {
  constructor() {
    super()
    this.state = {
      restaurants: null,
      filteredRestaurants: null,
      query: ''
    }
  }

  componentDidMount() {
    axios.get('/api/restaurants')
      .then((resp) => this.setState({
        restaurants: resp.data,
        filteredRestaurants: resp.data
      }))
      .catch(err => console.error(err))
  }

  filterTheRestaurants(event) {

    const searchQuery = event.target.value
    const filteredRestaurants = this.state.restaurants.filter((all) => {
      const regex = new RegExp(searchQuery, 'i')
      return all.name.match(regex)
    })

    this.setState({
      filteredRestaurants,
      query: searchQuery
    })
  }

  render() {
    console.log(this.state.restaurants)
    if (!this.state.restaurants) return <p>Watiting for Data</p>

    return <section className="section">
      <SearchBar query={this.state.query} onChange={() => this.filterTheRestaurants(event)} />
      <div className="container">
        <div className="columns is-centered is-mobile is-multiline">

          {this.state.filteredRestaurants.map(restaurant => {
            return <div key={restaurant._id} className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
              <div className="card">
                <div className="card-image">
                  {/* <figure className="image is-4by3">
                    <img src={restaurant.image} alt="Placeholder image" />
                  </figure> */}
                </div>
                <div className="card-content">
                  <Link className="subtitle" to={`/restaurant/${restaurant._id}`}>{restaurant.name}</Link>
                  <p className="has-text-grey-darker">{restaurant.address}</p>
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
    </section>
  }
}
export default Restaurants