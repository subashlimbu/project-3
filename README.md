

## NavBar 

We used a Bulma navbar component to format our navigation bar. We used a navbar-brand element to return the user to the homepage; a navbar-dropdown element to display a logout link for logged-in users; and a number of navbar-items containing links.

We wanted our navbar to contain different links, depending upon on whether a user is logged in or not. We achieved this by defining a variable 'isLoggedIn', which calls a function in our auth file that returns a boolean; we then, in our render, ensured that these elements only render if the 'isLoggedIn' condition is met, like so:

`function isLoggedIn() {
  return !!localStorage.getItem('token')
}`

`{isLoggedIn && <div className="navbar-item">
                <Link className="navbar-edited" to="/restaurant/new">Add a restaurant</Link>
              </div>}`

We used a navbar-burger to create a collapsible mobile-friendly display. By setting a variable in state called navMobileOpen, set initially as false, we could set display condition and toggle this variable to change the display.

`this.state = {
      navMobileOpen: false
    }`

`<a
              role="button"
              className={`navbar-burger burger ${this.state.navMobileOpen ? 'is-active' : ''}`}
              aria-label="menu"
              aria-expanded="false"
              onClick={() => this.setState({ navMobileOpen: !this.state.navMobileOpen })}
            >`
 
We also added a condition in componentDidUpdate that checks whether a new page has been navigated to; if it has, navMobileOpen is set to false, meaning the navbar is displayed 
`componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ navMobileOpen: false })
    }
  }`

When styling the navbar, we used much of the default Bulma styling, although we wanted to make our own style decisions on particular elements. While the majority of this was trivial to do, some elements took more careful consideration. For example, to prevent the link to the current page from automatically highlighting white with blue text, we removed the bulma class 'navbar-item' and replaced it with 'navbar-edited', and ensured that any desirable default styling was recreated in our personalised class.


## Adding a restaurant

Within our secureRoute paths, we included a component to allow logged-in users to add a restaurant to the database. On the front-end, we have a classical component which includes all the keys from the restaurant schema in this.state. The page renders a form (stored as its own functional component), with appropriate inputs for all the data types. The handleChange function sets this.state.data with the current input as the user types into each field, and the handleSubmit fuction sends a POST request using axios to our API. As this is a secure route, the Bearer token is included in the headers. The user is then redirected to their newly-created restaurant page.

In our backend, we included this route in our router.js:

`router.route('/restaurants')
  .post(secureRoute, restaurantController.createNewRestaurant)`
 
Within our restaurantController.js file, we wrote a function createNewRestaurant, which identifies the current user, then creates a restaurant using the request body data, and then if successful, returns a status code 201.

`function createNewRestaurant(req, res) {
  req.body.user = req.currentUser
  Restaurant
    .create(req.body)
    .then(restaurant => {
      res.status(201).send(restaurant)
    })
}`
 
 

## Register, Log In and Log Out

While anyone can view restaurant information on our site, logged-in users have access to more advanced functionality, including marking favourites, adding new restaurants, and leaving comments.

###Register

To register, users complete a form with all fields required by our schema (email, username, password, and password confirmation). Our handleChange function updates this.state.data with each keystroke, and our handleSubmit function posts the data to our API endpoint. 

If the API returns an error - for example, if the password and passwordConfirmation do not match - the error is set in state, and the error message is rendered onto the page so the user can correct their information and resubmit.

(Insert pic here)

`          {errors.passwordConfirmation && <small className="help is-danger">
            {errors.passwordConfirmation.message}
          </small>}`

### Log In

--- someone else - who made the modal? Talk about what is rendered.

When the form is submitted, a POST request containing the data is sent using axios to our API endpoint. 
Error handling
If the request is successful, the response will include a token which is set in local storage using the setToken function in the auth.js file. The user's name is also set so that it can be displayed in the navbar.

`  handleSubmit(event) {
    event.preventDefault()
    axios.post('/api/login',
      this.state.data)
      .then(response => {
        const token = response.data.token
        const name = response.data.message
        auth.setToken(token)
        auth.setName(name)
        this.props.history.push('/')
      })
      .catch(error => this.setState({ error: error.response.data.message }))
  }`
  
`function setToken(token) {
  localStorage.setItem('token', token)
}`

### Log Out 

Once logged in, the navbar will display a 'logout' option in a dropdown beneath the username. On click, this runs our logout function in our auth file, which removes the Bearer token from local storage. This means that the user will no longer be able to access any secure routes, as these require a token. 

`function logout() {
  localStorage.removeItem('token')
}` 

Denise could include something about the logging out when componentDidMount (but not)


## All Restaurants

## Filter and search for restaurants

The Restaurants.js component also includes a searchbar, allowing the user to search for a restaurant by name; and a filter, allowing the user to filter restaurants by cuisine type. These two features also work together, allowing for a more precise search. 

We achieved this by including two functions, handleDropdown and handleSearch. Each of these functions takes account of the state of the other to allow them to work together. 

In our searchbar function, a variable stored in the state called 'searchText' is set to the searchbar text every time a keypress is detected. We then check whether the dropdown option has been selected - this is also set in state when selected - and if there is no dropdown option selected, the restaurants are filtered by checking whether the restaurant name includes the searchText string. Both the restaurant name and the searchText string are converted to lower case to avoid issues with case. If the dropdown has been selected, then the array filter method will return restaurants whose cuisine array includes the dropdown selected and whose name includes the searchText string. 

`  handleSearch(event) { //handles search bar
    this.setState({ searchText: event.target.value.toLowerCase() }) //event.target.value is what's typed into the searchbar 
    if (!this.state.dropDownOption) { //if only the searchbar is used 
      const onlySearched = this.state.restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(event.target.value.toLowerCase())
      })
      this.setState({ filteredRestaurants: onlySearched })
    } else { //if both searchbar and dropdown is used 
      const bothUsed = this.state.restaurants.filter(restaurant => {
        return (restaurant.cuisine.includes(this.state.dropDownOption) && restaurant.name.toLowerCase().includes(event.target.value))
      })
      this.setState({ filteredRestaurants: bothUsed })
    }
  }`

The handleDropdown function works similarly: the option selected is set in state, and if the searchbar does not contain any text, then the restaurants are filtered by the cuisine type selected; if the searchbar does contain text, then the function returns only those restaurants whose cuisine type array includes the dropdown option and whose name includes the searchText string.

We also ensured that if the dropdown is set to 'Search All', all restaurants are displayed. 

## Changing your password

Logged-in users have the ability to change their password. This is done by sending a PUT request to our API profile endpoint, including the Bearer token in the request headers. 

Our changePassword function in the userController then finds the user by id. The request includes the user's old password, and the function first checks that this password is valid using the validatePassword function, and returns a 401 status if it is not. 

If the old password is valid, the newPassword and passwordConfirmation from the request are set and saved. The User schema includes validation checks on the password, checking that it is suitably complex and that the confirmation matches the password. If there is an error, this is returned in the response.  Otherwise, a 200 status is sent.

`.then(user => {
      if (!user.validatePassword(req.body.oldPassword)) {
        return res.status(401).send({ passwordValidation: { message: 'Wrong password' } })
      }
      user.set({ password: req.body.newPassword, passwordConfirmation: req.body.passwordConfirmation })
      return user.save(function (error, user) {
        if (error) {
          return res.status(401).send(error.errors)
        }
        return res.sendStatus(200)
      })
    })`

The most challenging aspect of this was handling errors. In our userController, the validation checks are done through the User schema rather than directly in the changePassword function, so we had to ensure that the errors were returned to the front-end such that they could be easily read.

Our front-end ChangePassword component displays any error messages returned from the back-end so the user can amend their information. If the status 200 is returned, the user is redirected back to their profile page.

`{errors.passwordValidation && <small className="help is-danger">
              {errors.passwordValidation.message}
            </small>}`

The fields in the 'Change Password' form have the added function of being toggle-able between password and text (hidden and visible). We used the 'visibility' icon from material-icons at the end of each input field, and wrapped these two items in a bordered div. We set an onClick event on this icon which calls a function called toggleVisibility, which switches the value of the variable 'hidden' between true and false. The 'type' field of the input field is defined using a ternary operator based on the value of the 'hidden' variable.

`  toggleVisibility(event) {
    event.preventDefault()
    this.setState({ hidden: !this.state.hidden })
  }`

`<div className="control include-eye">
        <input
          onChange={(event) => handleChange(event)}
          type={this.state.hidden ? 'password' : 'text'}
          name={name}
          className="input change"
        />
        <span className="material-icons eye current" onClick={() => {
          this.toggleVisibility(event)
        }}>visibility</span>
      </div>`
      
In order to allow each field to have its own state, and avoid toggling all fields when one icon is clicked, we pulled the code for PasswordField out into its own component with its own state.


## Single Restaurant Page
