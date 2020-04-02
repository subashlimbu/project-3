import React from 'react'

const ImageUploader = ({ handleSubmit }) => {
  return <form id='image-form' className="form" onSubmit={handleSubmit}>
    <div className="field">
      <label className="label">
        Upload Images
      </label>
      <div className="control">
        <input type="file" name='image' multiple/>
      </div>
    </div>
    <button className="button image-upload-button" type='submit'>
      Upload
    </button>
  </form>
}

export default ImageUploader