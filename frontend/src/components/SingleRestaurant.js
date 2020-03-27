import React from 'react'
import axios from 'axios'
import Map from './Map'
import Comments from './Comments'
import LoaderSpinner from './LoaderSpinner'
import { Link } from 'react-router-dom'
import Email from './Email'
import auth from '../lib/auth'


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

  crossTick(boolean) {
    if (boolean === true) {
      return '✅'
    } else {
      return '❌'
    }
  }

  render() {

    // console.log(this.props.match)
    // console.log(this.state.restaurant)
    if (!this.state.restaurant) {
      return <LoaderSpinner />
    }

    const id = this.props.match.params.id
    const { name, address, postcode, telephone, image, link, bookingLink, cuisine, serveAlcohol, veggieFriendly, isHalal } = this.state.restaurant
    const isLoggedIn = auth.isLoggedIn()
    // return <section className="section" >


    //     <div className="container" >
    //       <div className="columns" >
    //         <div className="column is-one-half single-info" >
    //           <h1 className="title">{name}</h1>
    //           <p>{address}</p>
    //           <p>{postcode}</p>
    //           <p>{telephone}</p>
    //         </div>
    //         <div className="column is-one-half">
    //           <Map
    //             postcode={postcode}
    //           />
    //         </div>
    //       </div>
    //     </div>


    //   <section className="section">
    //     <div className="container">
    //       <Comments restaurantId={id} />
    //     </div>
    //   </section>

    // </section>

    // playing with layout
    return <>

      <section className="hero is-medium">
        <div className="hero-body" style={{ backgroundImage: `url(${image})` }}>
          <div className="container single-name-background">
            <h1 className="title single-name">
              {name}
            </h1>
          </div>
        </div>
      </section>

      <section >
        <div className="container" >
          <div className="columns" >
            <div className="column is-one-half single-info" >
              <div className="single-address">
                <p className="single-details">{address}</p>
                <p className="single-details">{postcode}</p>
                <p className="single-details">{telephone}</p>
              </div>
              <div className="single-link">
                <Link to={link}>{link}</Link>
              </div>
              <div className="single-link-button">
                {bookingLink && <button className="button is-normal">
                  <a target="_blank" rel="noopener noreferrer" href={bookingLink}>
                    {'Book online'}
                  </a>
                </button>}
              </div>
              <div className="single-cuisine">
                <p className="smaller-details">Cuisines served: {cuisine.join(', ')} </p>
              </div>
              <div className="single-ticks">
                <p className="smaller-details">Serves alcohol: {this.crossTick(serveAlcohol)}</p>
                <p className="smaller-details">Vegetarian-friendly: {this.crossTick(veggieFriendly)}</p>
                <p className="smaller-details">Serves halal meat: {this.crossTick(isHalal)}</p>
              </div>
              <div className="email">
                {isLoggedIn && <Email restaurantId={id} />}
              </div>
            </div>
            <div className="column is-one-half single-info">
              <Map
                postcode={postcode}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Comments restaurantId={id} />
        </div>
      </section>

    </>
    // end of playing with layout

  }
}

export default SingleRestaurant