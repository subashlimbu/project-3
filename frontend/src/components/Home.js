import React from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Spring } from 'react-spring/renderprops'
import { Parallax } from 'react-parallax'
import NavBar from './NavBar'


const Home = (props) => {

  let randomRestaurantId
  function getRandomRestaurant() {
    axios.get('/api/random')
      .then((resp) => {
        randomRestaurantId = resp.data._id
        return randomRestaurantId
      })
      .then((randomRestaurantId) => {
        props.history.push(`/restaurant/${randomRestaurantId}`)
      })

  }

  return <>
    <section className="hero is-large">
      <div className="hero-body is-large">
        <Spring
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}
          config={{ delay: 500, duration: 1000 }}
        >
          {props => (
            <div style={props}>
              <div className="container has-text-centered homepage-textbox">
                <p className="has-text-centered has-text-white frontpagetitle">Food For Thought</p>
                <p className="has-text-centered frontpagesubtitle">Find London's Hottest Restaurants</p>
              </div>

            </div>
          )}
        </Spring>

      </div>
    </section>
    <section className="footer-container">
      <div className="container is-fluid random-container">
        <div className="notification random-container-text">
          <div className="columns">
            <div className="column flexhome">
              <span className="random-text introductiontext"> Suspendisse placerat commodo ipsum at pulvinar. Proin iaculis dolor non ante sagittis, id eleifend dui ultricies. Pellentesque consectetur elit non elementum finibus. Aliquam erat volutpat. Aliquam porttitor felis et nisi aliquet volutpat. Suspendisse potenti. Vivamus cursus felis quam, ac varius nibh vehicula quis. Vestibulum eget gravida leo, hendrerit egestas risus. Nunc sed ligula lectus. Nullam ut lacinia erat, sed blandit mi. </span>
            </div>
            <div className="column flexhomerandom">
              <span className="random-text1 randomrestosection"> Click to find a random restaurant: </span>
              <button
                onClick={() => getRandomRestaurant()}
                className="randombutton" >
                {/* was previous button is-normal ^ */}
                {'Gamble'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

  </>
}



export default withRouter(Home)