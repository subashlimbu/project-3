import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'
import RestaurantForm from './RestaurantForm'
import ImageUploader from './ImageUploader'


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
        isHalal: null,
        imageGallery: []
      },
      imageUploaded: false,
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

  uploadImages(event) {
    event.preventDefault()
    //gets the image form from the dom
    const imageForm = document.getElementById('image-form')
    //gets the formdata in a way the backend will understand
    const imageFormData = new FormData(imageForm)
    //sets the content type for the request
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    axios.post('/api/upload', imageFormData, config)
      .then(res => {
        console.log(res.data.files)
        this.setState({ restaurant: { imageGallery: res.data.files } })
      })
      .catch(err => console.log('borked ', Object.entries(err)))
  }

  render() {
    const { errors, data } = this.state
    return <div className="main-container">
      <h1 className="title">Add a new restaurant</h1>
      <RestaurantForm
        handleSubmit={(event) => this.handleSubmit(event)}
        handleChange={(event) => this.handleChange(event)}
        uploadImages={(event) => this.uploadImages(event)}
        addImages={(event) => this.addImages(event)}
        errors={errors}
        data={data}
      />
      <ImageUploader
        handleSubmit={(event) => this.uploadImages(event)}
      />
    </div>
  }
}
export default AddRestaurant