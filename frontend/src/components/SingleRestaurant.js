import React from 'react'
import axios from 'axios'
import Map from './Map'
import Comments from './Comments'
import LoaderSpinner from './LoaderSpinner'
import { Link } from 'react-router-dom'
import Email from './Email'
import auth from '../lib/auth'
import FavouriteButton from './FavouriteButton'
import ImageSlider from './ImageSlider'


class SingleRestaurant extends React.Component {

  constructor() {
    super()
    this.state = {
      restaurant: null,
      isFavourited: null,
      images: null
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id
    console.log('hello')
    // if user.favourites includes id, then setState this.state.isFavourited: true. else false 

    // COMMENTED OUT HERE 
    // const isLoggedIn = auth.isLoggedIn()
    // isLoggedIn && axios.get('/api/profile',
    //   { headers: { Authorization: `Bearer ${auth.getToken()}` } }
    // )
    //   .then(resp => {
    //     const favedRestoArray = resp.data.favourites
    //     // console.log(favedRestoArray)
    //     if (favedRestoArray.includes(id)) {
    //       this.setState({ isFavourited: true })
    //     } else {
    //       this.setState({ isFavourited: false })
    //     }
    //   })


    axios.get(`/api/restaurant/${id}`)
      .then(resp => {
        // console.log(resp)
        this.setState({ restaurant: resp.data })
        console.log(resp.data)

      })
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
    const { name, address, postcode, telephone, image, link, bookingLink, cuisine, serveAlcohol, veggieFriendly, halalFriendly, priceRange, imageGallery } = this.state.restaurant
    const isLoggedIn = auth.isLoggedIn()
    const urlList = imageGallery.map(image => {
      return {
        url: `http://localhost:8000/api/image/${image.filename}`
      }
    })
    return <div className='main-container'>

      {/* <section className="hero is-medium">
        <div className="hero-body" style={{ backgroundImage: `url(${image})` }}>
          <div className="container single-name-background">
            <h1 className="title single-name">
              {name}
            </h1>
          </div>
        </div>
      </section> */}
      <h1 className="title is-1 is-title-light">{name}</h1>
      <hr />
      <FavouriteButton restaurantId={id} isFavourited={this.state.isFavourited} />
      <div className="columns is-variable is-5" >
        <figure className="image is-4by2">
          {image !== '' && <img src={image} alt={name} className="sImage" />}
        </figure>
        <div className="column is-one-half single-info" >
          <div className="single-address">
            <p className="single-details">{address}</p>
            <p className="single-details">{postcode}</p>
            <p className="single-details">{telephone}</p>
          </div>
          <div className="single-link">
            {/* <Link to={link}>{link}</Link> */}
            <a target="_blank" rel="noopener noreferrer" href={link}>
              {link}
            </a>
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
            <p className="smaller-details">Serves halal meat: {this.crossTick(halalFriendly)}</p>
            <div className="single-price">
              <p className="smaller-details">Price range: {'£'.repeat(priceRange)} </p>
            </div>
          </div>
          <div className="email">
            {isLoggedIn && <Email restaurantId={id} />}
          </div>
        </div>
      </div>
      <div className="container">
        <hr />
        <div className="columns is-full-mobile">
          <div className="column is-one-third-desktop map-and-gallery is-full-tablet is-full-mobile">
            <div className="content map">
              <Map
                postcode={postcode}
              />
            </div>
            {imageGallery.length !== 0 && <ImageSlider urlList={urlList} />}
          </div>
          <div className="column is-two-thirds-desktop is-full-tablet is-full-mobile">
            <Comments restaurantId={id} />
          </div>
        </div>
      </div>

      {/* <section className="section">
        <div className="container">
          <Comments restaurantId={id} />
        </div>
      </section> */}

    </div>
    // end of playing with layout

  }
}

export default SingleRestaurant