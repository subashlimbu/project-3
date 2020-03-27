import React, { useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import auth from '../lib/auth'


const Email = (props) => {
  const [message, setMessage] = useState(null)

  const id = props.restaurantId
  console.log(id)

  function handleEmailRestoInfo() {
    console.log('gets in here')
    axios.get(`/api/restaurant/${id}/email`, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then((resp) => {
        console.log(resp)
        setMessage(resp.data)

      })
      .catch(err => {
        setMessage(err)
        console.log(err)
      })

  }
  return <>
    <button
      onClick={() => handleEmailRestoInfo()}
      className="button is-success"
    >
      {'Email restaurant info to me! '}
    </button>
    <p> {message} </p>

  </>
}



export default withRouter(Email)