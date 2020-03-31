import React from 'react'

class PasswordField extends React.Component {
  constructor() {
    super()
    this.state = {
      hidden: true
    }
  }

  toggleVisibility(event) {
    event.preventDefault()
    this.setState({ hidden: !this.state.hidden })
  }
  
  render() {
    const { name, title, handleChange } = this.props
    return <div className="field">
      <label className="label">
        {title}
      </label>
      <div className="control include-eye">
        <input
          onChange={(event) => handleChange(event)}
          type={this.state.hidden ? 'password' : 'text'}
          name={name}
          className="input change"
        />
        <span className="material-icons eye current" onClick={() => {
          this.toggleVisibility(event)
        }}>visibility</span>
      </div>
    </div>
  }
}

export default PasswordField