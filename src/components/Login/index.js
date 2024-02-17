import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    userId: '',
    pin: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}

    const apiUrl = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUserIdField = () => {
    const {userId} = this.state

    return (
      <>
        <label htmlFor="userIdName" className="label">
          USER ID
        </label>
        <input
          type="text"
          id="userIdName"
          className="input-field"
          value={userId}
          onChange={this.onChangeUserId}
          placeholder="Enter User ID"
        />
      </>
    )
  }

  renderPinField = () => {
    const {pin} = this.state

    return (
      <>
        <label htmlFor="pin" className="label">
          PIN
        </label>
        <input
          type="password"
          id="pin"
          className="input-field"
          value={pin}
          onChange={this.onChangePin}
          placeholder="Enter PIN"
        />
      </>
    )
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="main-con">
        <div className="ct-con">
          <div className="im-con">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="ima"
            />
          </div>
          <form className="form-el" onSubmit={this.onSubmitForm}>
            <h1 className="header"> Welcome Back! </h1>
            <div className="inp-con">{this.renderUserIdField()}</div>
            <div className="inp-con">{this.renderPinField()}</div>
            <button className="button" type="submit">
              Login
            </button>
            <div className="ct">
              {showErrorMsg === true && <p className="ep"> {errorMsg} </p>}
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default Login
