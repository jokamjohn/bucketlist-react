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
      loading: false,
    };
  }

  onRegister = event => {
    event.preventDefault();
    this.setState({loading: true});
    const {email, password, passwordConfirmation} = this.state;
    if (password !== passwordConfirmation) return this.onHandlePasswordError();
    const credentials = {
      email,
      password,
      passwordConfirmation
    };
    this.props.dispatch(registerUser(credentials))
        .then(() => this.onRegisterSuccess())
        .catch(error => this.onHandleError(error))
  };

  onChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  };

  onRegisterSuccess = () => {
    this.setState({loading: false});
    showToast("Registered successfully, Sign in to access your account");
  };

  onHandleError = error => {
    this.setState({loading: false});
    handleAPIError(error)
  };

  onHandlePasswordError = () => {
    this.setState({loading: false});
    showErrorToast("Passwords do not match")
  };

  render() {
    if (this.props.isRegistered) return <Redirect to="/login"/>;

    const {password, passwordConfirmation, loading} = this.state;

    return <RegisterCard
        onRegister={this.onRegister}
        onChange={this.onChange}
        password={password}
        passwordConf={passwordConfirmation}
        loading={loading}
    />
  }
}

Register.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isRegistered: PropTypes.bool
};


export default Register

