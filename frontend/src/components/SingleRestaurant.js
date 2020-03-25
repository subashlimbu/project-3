import React from 'react'
import axios from 'axios'
import Map from './Map'

class SingleRestaurant extends React.Component {

  constructor() {
    super()
    this.state = {
      restaurant: null
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id
    axios.get(`/api/restaurant/${id}`)
      .then(resp => this.setState({ restaurant: resp.data }))
      .catch(err => console.error(err))
  }

  render() {

    console.log(this.props.match)
    console.log(this.state.restaurant)
    if (!this.state.restaurant) {
      return <h1>Restaurant not ready...</h1>
    }
    const { name, address, postcode, telephone } = this.state.restaurant

    return <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-one-half">
            <h1 className="title">{name}</h1>
            <p>{address}</p>
            <p>{postcode}</p>
            <p>{telephone}</p>
          </div>
          <div className="column is-one-half">
            <Map
              postcode={postcode}
            />
          </div>
        </div>
      </div>
    </section>
  }
}

export default SingleRestaurant