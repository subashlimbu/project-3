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
      filteredCuisines: 'Chinese',
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
    console.log(this.state.filteredCuisines)
    console.log(event.target.value)
    if (event.target.value !== '') {
      const getRestaurantCuisine = this.state.restaurants.filter(restaurant => {
        console.log(restaurant)
        return restaurant.cuisine.includes(event.target.value)
      })
      this.setState({ filteredRestaurants: getRestaurantCuisine })
    } else {
      this.setState({ filteredRestaurants: this.state.filteredCuisines })
    }
  }

  render() {
    console.log(this.state.restaurants)
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
                  {/* <figure className="image is-4by3">
                    <img src={restaurant.image} alt="Placeholder image" />
                  </figure> */}
                </div>
                <div className="card-content">
                  {/* if (this.filteredRestaurants(event) === this.handleSearch(event)) { */}
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



// import React from 'react'
// import axios from 'axios'
// import SingleRestaurant from './SingleRestaurant'
// import DropSearch from './DropSearch'

// class Restaurants extends React.Component {

//   constructor() {
//     super()
//     this.state = {
//       restaurants: [],
//       cuisine: 'All',
//       name: ''
//     }

//     this.handleSearch = this.handleSearch.bind(this)
//   }

//   componentDidMount() {
//     axios.get('/api/restaurants')
//       .then(res => this.setState({ restaurants: res.data }))
//   }

//   handleSearch({ target: { name, value } }) {
//     this.setState({ [name]: value })
//     console.log(name)
//   }

//   filteredRestaurants() {
//     const re = new RegExp(this.state.name, 'i')
//     if (!this.state.cuisine && !this.state.name) return this.state.restaurants
//     console.log(this.state.restaurants)
//     return this.state.restaurants.filter(restaurant => {
//       return re.test(restaurant.name) && (this.state.cuisine === 'All' || restaurant.cuisine === this.state.cuisine)
//     })
//   }

//   render() {

//     if (this.state.restaurants.length === 0){
//       return (
//         <section className="section">
//           <div className="container">
//             <h4 className="title is-4">Loading...</h4>
//           </div>
//         </section>
//       )
//     }
//     return (

//       <section className="section">
//         <div className="container">
//           {/* <section className="section">
//             <h2 className="title has-text-centered is-title-light is-size-2">The Restaurants</h2>
//           </section> */}
//           <hr />
//           <DropSearch handleSearch={this.handleSearch} />
//           <div className="columns is-multiline">
//             {this.filteredRestaurants().map(restaurant =>
//               <div key={restaurant._id} className="column is-one-quarter">
//                 <SingleRestaurant {...restaurant} />
//               </div>
//             )}
//           </div>
//         </div>
//       </section>
//     )
//   }
// }

// export default Restaurants