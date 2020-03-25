import React from 'react'



const SearchBar = ({ query, onChange }) => {


  return <div className="search">
    <div className="field">
      <div className="control"><strong>Choose by restaurant</strong>
        <input
          className="input is-info"
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


// // // import React from 'react'

// // // const SearchBar = ({ handleChange }) => {

// // //   return (

// // //     <div className="field">
// // //       <div className="control searchFormDiv is-flex">
// // //         <label className="label is-searchform"> <strong> Explore by cuisine type </strong> </label>
// // //         <div className="select is-rounded">
// // //           <select
// // //             name="cuisine"
// // //             onChange={handleChange}
// // //           >
// // //             <option> All </option>
// // //             <option> Chinese </option>
// // //             <option> Janpanese </option>
// // //             <option> Italian </option>
// // //             <option> British </option>
// // //             <option> Indian </option>
// // //             <option> Spanish </option>
// // //             <option> Thai </option>
// // //             <option> Turkish </option>
// // //           </select>
// // //         </div>
// // //         <div className="field">
// // //           <div className="control is-flex">
// // //             <label className="label is-searchform"> <strong> Search By Restaurant </strong> </label>
// // //             <form>
// // //               <input name="restaurant" className="input searchBar is-rounded" type="text" placeholder="restaurant" onChange={handleChange} />
// // //             </form>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   )
// // // }

// // export default SearchBar