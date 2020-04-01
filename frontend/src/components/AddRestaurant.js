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
        image: '',
        address: '',
        postcode: '',
        telephone: '',
        bookingLink: '',
        cuisine: [],
        serveAlcohol: null,
        veggieFriendly: null,
        halalFriendly: null,
        priceRange: null
      },
      uploading: false,
      uploaded: false,
      errors: {}
    }
  }
  handleChange(event) {
    const data = { ...this.state.data, [event.target.name]: event.target.value }
    console.log(data)
    this.setState({ data })
  }
  handleSubmit(event) {
    event.preventDefault()
    axios.post('/api/restaurants',
      this.state.data,
      { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => this.props.history.push(`/restaurant/${res.data._id}`))
      .then(res => console.log('line 37', res))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  uploadImages(event) {
    event.preventDefault()
    const { uploading } = this.state
    if (uploading) return console.log('go away')
    //gets the image form from the dom
    const imageForm = document.getElementById('image-form')
    //gets the formdata in a way the backend will understand
    const imageFormData = new FormData(imageForm)

    this.setState({ uploading: true })
    console.log('HI BEN ', this.state)
    //sets the content type for the request
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    axios.post('/api/upload', imageFormData, config)
      .then(res => {
        const data = { ...this.state.data, ['imageGallery']: res.data.files }
        this.setState({ uploading: false, uploaded: true })
        this.setState({ data })
      })
      .catch(err => console.log('borked ', Object.entries(err)))
  }

  render() {
    const { errors, data, uploading, uploaded } = this.state
    return <div className="main-container">
      <h1 className="title">Add a new restaurant</h1>
      <div className="columns is-full-mobile">
        <div className="column is-one-third-desktop">
          <RestaurantForm
            handleSubmit={(event) => this.handleSubmit(event)}
            handleChange={(event) => this.handleChange(event)}
            uploadImages={(event) => this.uploadImages(event)}
            addImages={(event) => this.addImages(event)}
            errors={errors}
            data={data}
          />
          {uploading && <small className="is-danger">Uploading...</small>}
          {uploaded && <small className="is-danger">Uploaded!</small>}
        </div>
        <div className="column is-two-thirds-desktop">
          <ImageUploader
            handleSubmit={(event) => this.uploadImages(event)}
          />
        </div>
      </div>
    </div>
  }
}
export default AddRestaurant