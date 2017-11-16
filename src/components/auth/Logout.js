import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {logoutUser} from "../../actions/logout";

class Logout extends React.Component {

  componentWillMount() {
    this.props.dispatch(logoutUser());
  }

  render() {
    if (!this.props.isAuthenticated) return <Redirect to="/"/>;
    return null
  }
}

Logout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};


export default Logout