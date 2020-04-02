import React from 'react'



const SearchBar = ({ query, onChange }) => {


  return <div className="search">
    <div className="field">
      <label className="label is-flex"> <strong className="searchfont"> SEARCH BY RESTAURANT NAME </strong> </label>
      <div className="control">
        <input
          className="input is-rounded"
          type="text"
          placeholder="Search..."
          value={query}
          onChange={onChange}>
        </input>
      </div>
    </div>
  </div >
}

export default SearchBar