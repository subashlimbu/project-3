import React from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import axios from 'axios'

class Map extends React.Component {

  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: null,
      longitude: null,
      zoom: 16
    }
  };

  componentDidMount() {
    axios.get(`http://api.postcodes.io/postcodes/${this.props.postcode}`)
      .then(resp => {
        // console.log(resp.data.result.longitude)
        console.log(resp.data.result.latitude)
        const viewport = { ...this.state.viewport, longitude: resp.data.result.longitude, latitude: resp.data.result.latitude }
        this.setState({ viewport })
      })
    console.log('gets here')
    console.log(this.state.viewport.latitude)


  }

  render() {
    if (!this.state.viewport.latitude || !this.state.viewport.longitude) {
      return <h1>Generating restaurants map... </h1>
    }
    return (
      <ReactMapGL
        mapStyle='mapbox://styles/mapbox/streets-v11'
        mapboxApiAccessToken='pk.eyJ1IjoiZGVuaXNlY2hldW5nMyIsImEiOiJjazg1dm8zbXAwMHRjM2ZuNDRwYzBsc2dyIn0.f3j4m4DkK3RYG0vAVhE8_Q'
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({ viewport })}>
        <Marker latitude={this.state.viewport.latitude} longitude={this.state.viewport.longitude} offsetLeft={-20} offsetTop={-10}>
          <img src="https://i.imgur.com/MK4NUzI.png" />
        </Marker>
      </ReactMapGL>

    )
  }
}

export default Map 