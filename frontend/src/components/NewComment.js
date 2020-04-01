import React from 'react'

const NewComment = ({ onSubmit, onChange }) => {
  return <form className="form" onSubmit={onSubmit}>
    <div className="field">
      <div className="control">
        <textarea
          className="textarea new-comment-textfield"
          placeholder="Insert comment here"
          onChange={onChange}
        />
      </div>
    </div>
    <button type="submit" className="button is-success">Submit</button>
  </form>

}

export default NewComment