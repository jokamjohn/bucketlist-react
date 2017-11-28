import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {registerUser} from "../../actions/register";
import {handleAPIError, showErrorToast, showToast} from "../../utilities/Utils";
import {RegisterCard} from "./RegisterCard";

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
    };
  }

  onRegister = event => {
    event.preventDefault();
    const {email, password, passwordConfirmation} = this.state;
    if (password !== passwordConfirmation) return showErrorToast("Passwords do not match");
    const credentials = {
      email,
      password,
      passwordConfirmation
    };
    this.props.dispatch(registerUser(credentials))
        .then(() => showToast("Registered successfully, Sign in to access your account"))
        .catch(error => handleAPIError(error))
  };

  onChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  };

  render() {
    if (this.props.isRegistered) return <Redirect to="/login"/>;

    const {password, passwordConfirmation} = this.state;

    return <RegisterCard
        onRegister={this.onRegister}
        onChange={this.onChange}
        password={password}
        passwordConf={passwordConfirmation}
    />
  }
}

Register.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isRegistered: PropTypes.bool
};


export default Register

