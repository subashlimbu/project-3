import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'
import axios from 'axios'
import auth from '../lib/auth'


class FavouriteButton extends React.Component {
  constructor() {
    super()
    this.state = {
      isFavourited: null
    }
  }

  componentDidMount() {

    const isLoggedIn = auth.isLoggedIn()
    isLoggedIn && axios.get('/api/profile',
      { headers: { Authorization: `Bearer ${auth.getToken()}` } }
    )
      .then(resp => {
        const favedRestoArray = resp.data.favourites
        // console.log(favedRestoArray)
        if (favedRestoArray.includes(this.props.restaurantId)) {
          this.setState({ isFavourited: true })
        } else {
          this.setState({ isFavourited: false })
        }
      })
  }


  handleFavouriteButton(event) {
    const { restaurantId } = this.props
    event.preventDefault()
    // this.setState({
    //   isFavourited: !this.state.isFavourited
    // },
    //   () => {
    //     if (this.state.isFavourited) {
    //       axios.put('/api/restaurant/favourite',
    //         { restaurantId },
    //         { headers: { Authorization: `Bearer ${auth.getToken()}` } })
    //       // .catch(err => this.setState({ errors: err.response.data.errors }))
    //     } else {
    //       axios.put('/api/restaurant/unfavourite',
    //         { restaurantId },
    //         { headers: { Authorization: `Bearer ${auth.getToken()}` } })
    //       // .catch(err => this.setState({ errors: err.response.data.errors }))
    //     }

    //   }
    // )

    if (!this.state.isFavourited) {
      axios.put('/api/restaurant/favourite',
        { restaurantId },
        { headers: { Authorization: `Bearer ${auth.getToken()}` } })
        .then(() => this.setState({ isFavourited: true }))
        .catch(err => console.log(err))
    } else {
      axios.put('/api/restaurant/unfavourite',
        { restaurantId },
        { headers: { Authorization: `Bearer ${auth.getToken()}` } })
        .then(() => this.setState({ isFavourited: false }))
        .catch(err => console.log(err))
    }
  }

  //pass restaurant id from singlerestaurant as a prop to favourite button 

  render() {
    return <button className="button is-normal" onClick={(event) => this.handleFavouriteButton(event)}>
      <FontAwesomeIcon icon={this.state.isFavourited ? faStar : faStarEmpty} />
      {'Favourite'}
    </button>

  }
}



export default FavouriteButton