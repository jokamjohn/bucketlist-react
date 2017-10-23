import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {USER_EMAIL} from "../utilities/Constants";

class Navbar extends React.Component {

  render() {
    const email = localStorage.getItem(USER_EMAIL);
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
          <NavLink className="navbar-brand" exact to="/">BucketList</NavLink>
          <button className="navbar-toggler" type="button" data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {this.props.isAuthenticated ?
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <NavLink className="nav-link" exact to="/">Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink exact className="nav-link" to="/buckets">{email}</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink exact className="nav-link" to="/logout">logout</NavLink>
                  </li>
                </ul>
              </div>
              :
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <NavLink className="nav-link" exact to="/">Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
                  </li>
                </ul>
              </div>
          }
        </nav>
    )
  }
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};


export default Navbar