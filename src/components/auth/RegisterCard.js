import React from 'react';
import PropTypes from 'prop-types';
import {ErrorAlert} from "../ErrorAlert";
import {DEFAULT_LOADER_COLOR, MINIMUM_PASSWORD_LENGTH} from "../../utilities/Constants";
import Loader from "../Loader";

export const RegisterCard = ({onRegister, onChange, password, passwordConf, loading}) => (
    <div className="container main-content">
      {loading && <Loader color={DEFAULT_LOADER_COLOR}/>}
      <div className="row">
        <div className=" col-sm-5 mx-sm-auto">
          <div className="card auth-card">
            <div className="card-body">
              {(password.length <= MINIMUM_PASSWORD_LENGTH || passwordConf.length <= MINIMUM_PASSWORD_LENGTH)
              && <ErrorAlert message="Password must be a minimum of 5 characters"/>}
              {password !== passwordConf && <ErrorAlert message="Passwords do not Match"/>}
              <h4 className="card-title">Sign Up</h4>
              <form onSubmit={onRegister}>
                <div className="form-group">
                  <input type="email"
                         className="form-control"
                         aria-describedby="emailHelp"
                         placeholder="Email address"
                         name="email"
                         onChange={onChange}
                         required
                  />
                  <small className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="form-group">
                  <input type="password"
                         className="form-control"
                         id="password"
                         placeholder="Password"
                         name="password"
                         onChange={onChange}
                         required
                  />
                </div>
                <div className="form-group">
                  <input type="password"
                         className="form-control"
                         id="confirm_password"
                         placeholder="Confirm Password"
                         name="passwordConfirmation"
                         onChange={onChange}
                         required
                  />
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
);

RegisterCard.propTypes = {
  onRegister: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  password: PropTypes.string,
  passwordConf: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};