import React from 'react'
import SimpleImageSlider from 'react-simple-image-slider'

const ImageSlider = ({ urlList }) => {
  return <div>
    <SimpleImageSlider
      width={896}
      height={504}
      images={urlList}
    />
  </div>
}

export default ImageSlider