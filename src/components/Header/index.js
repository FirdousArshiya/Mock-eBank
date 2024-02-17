import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props

    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <nav className="nav-el">
      <Link to="/" className="link-el">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          className="logo-img"
          alt="website logo"
        />
      </Link>
      <button type="button" className="logout-btn" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  )
}
export default withRouter(Header)
