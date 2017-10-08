import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {registerUser} from "../../actions/register";

class Register extends React.Component {

  onRegister = event => {
    event.preventDefault();
    const email = this.email.value;
    const password = this.password.value;
    const confirm_password = this.password_confirmation.value;
    const credentials = {email: email, password: password, passwordConfirmation: confirm_password};
    this.props.dispatch(registerUser(credentials));
  };

  render() {
    if (this.props.isRegistered) {
      this.props.history.push('login')
    }

    const message = this.props.message;
    return (
        <div className="container main-content">
          <div className="row">
            <div className=" col-sm-5 mx-sm-auto">
              <div className="card auth-card">
                <div className="card-body">
                  <h4 className="card-title">Sign Up</h4>
                  <form onSubmit={this.onRegister}>
                    <div className="form-group">
                      <input type="email" className="form-control" aria-describedby="emailHelp"
                             placeholder="Email address" ref={(input) => this.email = input} required/>
                      <small id="emailHelp" className="form-text text-muted">We'll never share your
                        email with
                        anyone
                        else.
                      </small>
                    </div>
                    <div className="form-group">
                      <input type="password" className="form-control" id="password" placeholder="Password"
                             ref={(input) => this.password = input} required/>
                    </div>
                    <div className="form-group">
                      <input type="password" className="form-control" id="confirm_password"
                             placeholder="Confirm Password" ref={(input) => this.password_confirmation = input}
                             required/>
                      {message
                          ?
                          <small className="text-danger">{message}</small>
                          :
                          ''
                      }
                    </div>
                    <div className="text-center">
                      <input type="submit" value="Create Account" className="btn btn-primary"/>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

Register.propTypes = {
  dispatch: PropTypes.func.isRequired,
  message: PropTypes.string,
  isRegistered: PropTypes.bool
};


export default withRouter(Register)

