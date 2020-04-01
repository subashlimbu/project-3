import React from 'react'

// few commented bits which can be used when we create the 'edit restaurant' feature

const RestaurantForm = ({ handleSubmit, handleChange, errors, data }) => {
  // const { name, link, address, postcode, telephone, bookingLink, cuisine, serveAlcohol, veggieFriendly, isHalal } = data
  console.log(data)
  return <form
    className="form"
    onSubmit={(event) => handleSubmit(event)}
  >

    <div className="field">
      <label className="label">
        Name
      </label>
      <div className="control">
        <input
          onChange={(event) => handleChange(event)}
          type="text"
          name="name"
          className="input"
        // value={name}
        />
      </div>
      {errors.name && <small className="help is-danger">
        {errors.name}
      </small>}
    </div>

    <div className="field">
      <label className="label">
        Website
      </label>
      <div className="control">
        <input
          onChange={(event) => handleChange(event)}
          type="text"
          name="link"
          className="input"
        // value={link}
        />
      </div>
      {errors.link && <small className="help is-danger">
        {errors.link}
      </small>}
    </div>

    <div className="field">
      <label className="label">
        Street address - e.g. 42 Warton Road
      </label>
      <div className="control">
        <input
          onChange={(event) => handleChange(event)}
          type="text"
          name="address"
          className="input"
        // value={address}
        />
      </div>
      {errors.address && <small className="help is-danger">
        {errors.address}
      </small>}
    </div>

    <div className="field">
      <label className="label">
        Postcode
      </label>
      <div className="control">
        <input
          onChange={(event) => handleChange(event)}
          type="text"
          name="postcode"
          className="input"
        // value={postcode}
        />
      </div>
      {errors.postcode && <small className="help is-danger">
        {errors.postcode}
      </small>}
    </div>

    <div className="field">
      <label className="label">
        Telephone
      </label>
      <div className="control">
        <input
          onChange={(event) => handleChange(event)}
          type="text"
          name="telephone"
          className="input"
        // value={telephone}
        />
      </div>
      {errors.telephone && <small className="help is-danger">
        {errors.telephone}
      </small>}
    </div>

    <div className="field">
      <label className="label">
        Link to online booking (optional)
      </label>
      <div className="control">
        <input
          onChange={(event) => handleChange(event)}
          type="text"
          name="bookingLink"
          className="input"
        // value={bookingLink}
        />
      </div>
      {errors.bookingLink && <small className="help is-danger">
        {errors.bookingLink}
      </small>}
    </div>

    <div className="field">
      <label className="label">
        Image (link to image hosted online)
      </label>
      <div className="control">
        <input
          onChange={(event) => handleChange(event)}
          type="text"
          name="image"
          className="input"
        // value={image}
        />
      </div>
      {errors.image && <small className="help is-danger">
        {errors.image}
      </small>}
    </div>

    <div className="field">
      <label className="label">
        Cuisine
      </label>
      <div className="control">

        <select
          id="cuisine"
          onChange={(event) => handleChange(event)}
          type="text"
          name="cuisine"
          className="input"
        // value={cuisine}>
        >
          <option disabled selected value> -- select an option -- </option>
          <option value="Chinese">Chinese</option>
          <option value="Japanese">Japanese</option>
          <option value="Italian">Italian</option>
          <option value="Indian">Indian</option>
          <option value="Spanish">Spanish</option>
          <option value="Thai">Thai</option>
          <option value="Turkish">Turkish</option>
        </select>
      </div>
      {errors.cuisine && <small className="help is-danger">
        {errors.cuisine}
      </small>}
    </div>

    <div className="field">
      <label className="label">
        Does the restaurant serve alcohol?
      </label>
      <div className="control">
        <select
          onChange={(event) => handleChange(event)}
          type="text"
          name="serveAlcohol"
          className="input"
        // value={serveAlcohol}
        >
          <option disabled selected value> -- select an option -- </option>
          <option value="true">Yes</option>
          <option value="false">No</option>
          <option value="false">Unsure</option>
        </select>
      </div>
      {errors.serveAlcohol && <small className="help is-danger">
        {errors.serveAlcohol}
      </small>}
    </div>

    <div className="field">
      <label className="label">
        Does the restaurant offer vegetarian options?
      </label>
      <div className="control">
        <select
          onChange={(event) => handleChange(event)}
          type="text"
          name="veggieFriendly"
          className="input"
        // value={veggieFriendly}
        >
          <option disabled selected value> -- select an option -- </option>
          <option value="true">Yes</option>
          <option value="false">No</option>
          <option value="false">Unsure</option>
        </select>
      </div>
      {errors.veggieFriendly && <small className="help is-danger">
        {errors.veggieFriendly}
      </small>}
    </div>

    <div className="field">
      <label className="label">
        Does the restaurant offer halal meat?
      </label>
      <div className="control">
        <select
          onChange={(event) => handleChange(event)}
          type="text"
          name="halalFriendly"
          className="input"
        // value={halalFriendly}
        >
          <option disabled selected value> -- select an option -- </option>
          <option value="true">Yes</option>
          <option value="false">No</option>
          <option value="false">Unsure</option>
        </select>
      </div>
      {errors.halalFriendly && <small className="help is-danger">
        {errors.halalFriendly}
      </small>}
    </div>

    <div className="field">
      <label className="label">
        Price (low-high)
      </label>
      <div className="control">
        <select
          onChange={(event) => handleChange(event)}
          type="text"
          name="priceRange"
          className="input"
        // value={priceRange}
        >
          <option disabled selected value> -- select an option -- </option>
          <option value="1">£</option>
          <option value="2">££</option>
          <option value="3">£££</option>
          <option value="4">££££</option>
        </select>
      </div>
      {errors.image && <small className="help is-danger">
        {errors.image}
      </small>}
    </div>

    <button className="button is-success">
      Submit restaurant
    </button>
  </form>
}
export default RestaurantForm