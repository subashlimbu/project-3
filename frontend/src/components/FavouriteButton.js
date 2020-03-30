import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'



class FavouriteButton extends React.Component {
  constructor() {
    super()
    this.state = {
      isFavourited: false
    }
  }



  render() {
    return <button className="button is-normal">
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStarEmpty} />
      {'Favourite'}

    </button>

  }

}


export default FavouriteButton