import React from 'react';
import PropTypes from 'prop-types';
import Breadcrumb from "../bucket/Breadcrumb";
import {resetPassword} from "../../actions/passwordreset";
import {MINIMUM_PASSWORD_LENGTH} from "../../utilities/Constants";
import {connect} from 'react-redux';

class PasswordReset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      newPasswordConfirmation: '',
    }
  }

  onSubmit = event => {
    event.preventDefault();
    const oldPassword = this.oldPassword.value;
    const newPassword = this.state.newPassword;
    const newPasswordConfirmation = this.state.newPasswordConfirmation;
    if (newPassword !== newPasswordConfirmation || newPassword.length <= MINIMUM_PASSWORD_LENGTH
        || newPasswordConfirmation <= MINIMUM_PASSWORD_LENGTH
        || oldPassword <= MINIMUM_PASSWORD_LENGTH) return;
    const isAuthenticated = this.props.isAuthenticated;
    this.props.dispatch(resetPassword(oldPassword, newPassword, newPasswordConfirmation, isAuthenticated))
  };

  onPasswordChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value})
  };

  /**
   * This is the message that is shown after the password reset API call.
   */
  passwordResetResponse = () =>
      <div>
        {this.props.passwordReset.message ?
            <div className="alert alert-warning" role="alert">
              {this.props.passwordReset.message}
            </div>
            :
            ''
        }
      </div>;

  passwordsDoNotMatch = () =>
      <div>
        {this.state.newPassword !== this.state.newPasswordConfirmation ?
            <div className="alert alert-warning" role="alert">
              Passwords do not match
            </div>
            :
            ''
        }
      </div>;

  invalidPasswordCharacters = () =>
      <div>
        {this.state.newPassword.length <= MINIMUM_PASSWORD_LENGTH
        || this.state.newPasswordConfirmation.length <= MINIMUM_PASSWORD_LENGTH
        || this.oldPassword.value.length <= MINIMUM_PASSWORD_LENGTH ?
            <div className="alert alert-warning" role="alert">
              Password must be more than 4 characters
            </div>
            :
            ''
        }
      </div>;

  render() {
    return (
        <div className="container main-content">

          <Breadcrumb/>

          <div className="row">
            <div className="col-md-6 mx-auto">
              <div className="card">
                <h4 className="card-header text-muted">Password Reset</h4>
                <div className="card-body">
                  {this.passwordResetResponse()}
                  {this.invalidPasswordCharacters()}
                  {this.passwordsDoNotMatch()}
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <label> Old Password</label>
                      <input type="password" className="form-control" placeholder="Password"
                             ref={input => this.oldPassword = input} required/>
                    </div>

                    <div className="form-group">
                      <label> New Password</label>
                      <input type="password" className="form-control" placeholder="Password"
                             value={this.state.newPassword} required name="newPassword"
                             onChange={event => this.onPasswordChange(event)}/>
                    </div>

                    <div className="form-group">
                      <label> New Password Confirmation</label>
                      <input type="password" className="form-control" placeholder="Password"
                             value={this.state.newPasswordConfirmation} required name="newPasswordConfirmation"
                             onChange={event => this.onPasswordChange(event)}/>
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Reset Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

PasswordReset.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  passwordReset: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const {isAuthenticated, passwordReset} = state;
  return {
    isAuthenticated,
    passwordReset
  }
};

export default connect(mapStateToProps)(PasswordReset)