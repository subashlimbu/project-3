import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import DropSearch from './DropSearch'


class Restaurants extends React.Component {
  constructor() {
    super()
    this.state = {
      // Allrestaurants: null,
      // cuisine: '',
      restaurants: null,
      filteredRestaurants: null,
      filteredCuisines: null,
      query: ''
    }
    // this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    axios.get('/api/restaurants')
      .then((resp) => this.setState({
        // Allrestaurants: resp.data,
        restaurants: resp.data,
        filteredRestaurants: resp.data,
        filteredCuisines: resp.data
      }))
      .catch(err => console.error(err))
  }

  filterTheRestaurants(event) {

    const searchQuery = event.target.value
    console.log(searchQuery)
    const filteredRestaurants = this.state.restaurants.filter((all) => {
      const regex = new RegExp(searchQuery, 'i')
      return all.name.match(regex)
    })

    this.setState({
      filteredRestaurants: filteredRestaurants,
      query: searchQuery
    })
  }

  handleSearch(event) {
    console.log(event.target.value)
    if (event.target.value !== '') {
      const getRestaurantCuisine = this.state.filteredRestaurants.filter(restaurant => {
        console.log(getRestaurantCuisine)
        return restaurant.cuisine.includes(event.target.value)
      }) 
      this.setState({ filteredRestaurants: getRestaurantCuisine })
    } else {
      this.setState({ filteredRestaurants: this.state.filteredRestaurants })
    }
  }

  render() {
    // console.log(this.state.restaurants)
    if (!this.state.restaurants) return <p>Waiting for Data</p>

    return <section className="section">
      <SearchBar query={this.state.query} onChange={() => this.filterTheRestaurants(event)} />
      <DropSearch handleSearch={() => this.handleSearch(event)} />
      <div className="container">
        <div className="columns is-centered is-mobile is-multiline">

          {this.state.filteredRestaurants.map(restaurant => {
            return <div key={restaurant._id} className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={restaurant.image} alt="Placeholder image" />
                  </figure>
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