import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, withRouter} from 'react-router-dom';
import {loginUser} from "../../actions/login";
import {handleAPIError, showToast} from "../../utilities/Utils";
import {LoginCard} from "./LoginCard";

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  onSubmit = event => {
    event.preventDefault();
    const {email, password} = this.state;
    const credentials = {email: email, password: password};
    this.props.dispatch(loginUser(credentials))
        .then(() => showToast("Welcome back!"))
        .catch(error => handleAPIError(error))
  };

  onChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value})
  };
  
  render() {
    const {from} = this.props.location.state || {from: {pathname: '/buckets'}};

    if (this.props.isAuthenticated) return <Redirect to={from}/>;

    return <LoginCard
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        password={this.state.password}
    />
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default withRouter(Login)


