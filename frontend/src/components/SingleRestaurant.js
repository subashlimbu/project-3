import React from 'react'
import axios from 'axios'
import Map from './Map'
import Comments from './Comments'

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

    const id = this.props.match.params.id
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
      <section className="section">
        <div className="container">
          <Comments restaurantId={id}/>
        </div>
      </section>
    </section>
  }
}

export default SingleRestaurant


// import React from 'react'
// import { Link } from 'react-router-dom'

// const SingleRestaurant = ({ _id, name, address, cuisine }) => {
//   return (
//     <Link to={`/restaurants/${_id}`}>
//       <div className="container">
//         {/* <figure className="image is-4by3"> */}
//         {/* <img src={image} alt={name}  className="gemImage"/> */}
//         <div className="middle">
//           <div className="text">{name}</div>
//           <div className="text">{address}</div>
//           <div className="text">{cuisine}</div>
//         </div>
//         {/* </figure> */}
//       </div>
//     </Link>
//   )
// }

// export default SingleRestaurant