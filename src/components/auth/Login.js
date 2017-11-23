import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, withRouter} from 'react-router-dom';
import {loginUser} from "../../actions/login";

class Login extends React.Component {

  onSubmit = event => {
    event.preventDefault();
    const email = this.email.value.trim();
    const password = this.password.value.trim();
    const credentials = {email: email, password: password};
    this.props.dispatch(loginUser(credentials));
  };

  render() {
    const {from} = this.props.location.state || {from: {pathname: '/buckets'}};

    if (this.props.isAuthenticated) return <Redirect to={from}/>;

    return (
        <div className="container main-content">
          <div className="row">
            <div className="col-sm-5 mx-sm-auto">
              <div className="card auth-card">
                <div className="card-body">
                  <h4 className="card-title">Login</h4>
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <input type="email" className="form-control" aria-describedby="emailHelp"
                             placeholder="Email address" ref={(input) => this.email = input}
                             required/>
                      <small id="emailHelp" className="form-text text-muted">We'll never share your
                        email
                        with anyone
                        else.
                      </small>
                    </div>
                    <div className="form-group">
                      <input type="password" className="form-control" placeholder="Password"
                             ref={(input) => this.password = input} required/>
                    </div>
                    <div className="text-center">
                      <input type="submit" value="Log In" className="btn btn-primary"/>
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

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default withRouter(Login)


