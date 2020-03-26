import React from 'react'

const DropSearch = ({ handleDropdown }) => {

  return (
    <div className="field is-flex">
      <div className="control">
        <label className="label is-flex"> <strong> Explore by cuisine </strong> </label>

        <div className="select is-rounded">
          <select
            name="cuisine"
            onChange={handleDropdown}
          >
            <option value="Search All" > Search All </option>
            <option> Chinese </option>
            <option> Japanese </option>
            <option> Italian </option>
            <option> Indian </option>
            <option> Spanish </option>
            <option> Thai </option>
            <option> Turkish </option>
          </select>
        </div>
        {/* <div className="field">
          <div className="control is-flex">
            <label className="label is-searchform"> <strong> Search By Name </strong> </label>
            <form>
              <input name="name" className="input searchBar is-rounded" type="text" placeholder="Name" onChange={handleSearch} />
            </form>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default DropSearch