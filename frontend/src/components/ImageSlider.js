import React from 'react'
import SimpleImageSlider from 'react-simple-image-slider'

const ImageSlider = ({ urlList }) => {
  // if (screenWidth < 600)
  return <div>
    <SimpleImageSlider
      width={444}
      height={250}
      images={urlList}
      className="image-slider"
    />
  </div>
}

export default ImageSlider