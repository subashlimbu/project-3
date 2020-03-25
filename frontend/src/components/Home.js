import React from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import { withRouter } from 'react-router-dom'



const Home = (props) => {
  console.log(this)
  console.log(props)
  let randomRestaurantId
  function getRandomRestaurant() {
    axios.get('/api/random')
      .then((resp) => {

        randomRestaurantId = resp.data._id
        return randomRestaurantId
      })
      .then((randomRestaurantId) => {
        console.log(randomRestaurantId)
        props.history.push(`/restaurant/${randomRestaurantId}`)
      })

  }
  return <>
    <section className="hero is-large">
      <div className="hero-body">
        <div className="container has-text-centered homepage-textbox">
          <p className="title has-text-centered">Food, glorious food!</p>
          <p className="subtitle has-text-centered">Hungry? Find tasty food near you.</p>
        </div>
      </div>
    </section>
    <section>
      <div className="container is-fluid random-container">
        <div className="notification random-container-text">
          <p className="random-text">Cant decide? Click to find a random restaurant!</p>
          <button
            onClick={() => getRandomRestaurant()}
            className="button is-normal" >
            {'Let fate decide!'}
          </button>
        </div>
      </div>
    </section>

  </>
}



export default withRouter(Home)