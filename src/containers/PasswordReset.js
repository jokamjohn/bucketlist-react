import React from 'react';
import PropTypes from 'prop-types';
import Breadcrumb from "../components/bucket/Breadcrumb";
import {resetPassword} from "../actions/passwordreset";
import {MINIMUM_PASSWORD_LENGTH} from "../utilities/Constants";
import {connect} from 'react-redux';
import {handleAPIError, showErrorToast, showToast} from "../utilities/Utils";
import {ResetPasswordCard} from "../components/auth/ResetPasswordCard";

class PasswordReset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirmation: '',
    }
  }

  onSubmit = event => {
    event.preventDefault();
    event.persist();
    const {oldPassword, newPassword, newPasswordConfirmation} = this.state;
    const {dispatch, isAuthenticated} = this.props;
    if (newPassword !== newPasswordConfirmation) return showErrorToast("New password does not match");
    if (newPassword.length <= MINIMUM_PASSWORD_LENGTH
        || newPasswordConfirmation <= MINIMUM_PASSWORD_LENGTH
        || oldPassword <= MINIMUM_PASSWORD_LENGTH)
      return showErrorToast("Password must be a minimum of 5 characters");

    dispatch(resetPassword(oldPassword, newPassword, newPasswordConfirmation, isAuthenticated))
        .then(() => this.onPasswordResetSuccess(event))
        .catch(error => handleAPIError(error))
  };

  onPasswordResetSuccess = event => {
    event.target.reset();
    showToast("Successful Password Reset");
  };

  onPasswordChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value})
  };

  render() {
    const {oldPassword, newPassword, newPasswordConfirmation: newPasswordConf} = this.state;
    return (
        <div className="container main-content">
          <Breadcrumb/>
          <ResetPasswordCard
              onPasswordChange={this.onPasswordChange}
              onSubmit={this.onSubmit}
              oldPassword={oldPassword}
              newPassword={newPassword}
              newPasswordConf={newPasswordConf}
          />
        </div>
    );
  }
}

PasswordReset.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  const {auth} = state;
  return {
    isAuthenticated: auth.isAuthenticated,
  }
};

export default connect(mapStateToProps)(PasswordReset)