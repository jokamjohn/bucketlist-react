import React from 'react';
import PropTypes from 'prop-types';
import {DEFAULT_LOADER_COLOR, MINIMUM_PASSWORD_LENGTH} from "../../utilities/Constants";
import {FormTip} from "../FormTip";
import Loader from "../Loader";

export const LoginCard = ({onSubmit, onChange, password, loading}) => (
    <div className="container main-content">
      {loading && <Loader color={DEFAULT_LOADER_COLOR}/>}
      <div className="row">
        <div className="col-sm-5 mx-sm-auto">
          <div className="card auth-card">
            <div className="card-body">
              <h4 className="card-title">Login</h4>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <input type="email"
                         className="form-control"
                         aria-describedby="emailHelp"
                         placeholder="Email address"
                         name="email"
                         onChange={onChange}
                         required
                  />
                  <FormTip message="We'll never share your email with anyone else"/>
                </div>
                <div className="form-group">
                  <input type="password"
                         className="form-control"
                         placeholder="Password"
                         name="password"
                         onChange={onChange}
                         required
                  />
                  {password.length <= MINIMUM_PASSWORD_LENGTH &&
                  <FormTip message="Password must be 5 characters and above"/>}
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
);

LoginCard.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  password: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};
