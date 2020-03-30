import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'
import RestaurantForm from './RestaurantForm'


class AddRestaurant extends React.Component {
  constructor() {
    super()
    this.state = {
      restaurant: {
        name: '',
        link: '',
        address: '',
        postcode: '',
        telephone: '',
        bookingLink: '',
        cuisine: [],
        serveAlcohol: null,
        veggieFriendly: null,
        isHalal: null
      },
      errors: {}
    }
  }
  handleChange(event) {
    const data = { ...this.state.data, [event.target.name]: event.target.value }
    this.setState({ data })
  }
  handleSubmit(event) {
    event.preventDefault()
    axios.post('/api/restaurants',
      this.state.data,
      { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => this.props.history.push(`/restaurant/${res.data._id}`))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }
  render() {
    const { errors, data } = this.state
    return <div className="main-container">
      <h1 className="title">Add a new restaurant</h1>
      <RestaurantForm
        handleSubmit={(event) => this.handleSubmit(event)}
        handleChange={(event) => this.handleChange(event)}
        errors={errors}
        data={data}
      />
    </div>
  }
}
export default AddRestaurant