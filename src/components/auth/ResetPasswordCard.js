import React from 'react';
import PropTypes from 'prop-types';
import {MINIMUM_PASSWORD_LENGTH} from "../../utilities/Constants";
import {ErrorAlert} from "../ErrorAlert";

export const ResetPasswordCard = ({onSubmit, onPasswordChange, newPassword, newPasswordConf, oldPassword}) => (
    <div className="row">
      <div className="col-md-6 mx-auto">
        <div className="card">
          <h4 className="card-header text-muted">Password Reset</h4>
          <div className="card-body">
            {(newPassword.length <= MINIMUM_PASSWORD_LENGTH
                || newPasswordConf.length <= MINIMUM_PASSWORD_LENGTH
                || oldPassword.length <= MINIMUM_PASSWORD_LENGTH)
            &&
            <ErrorAlert message="Password must be a minimum of 5 characters"/>
            }
            {newPassword !== newPasswordConf && <ErrorAlert message="Passwords do not match"/>}
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label>
                  Old Password
                </label>
                <input type="password"
                       className="form-control"
                       placeholder="Password"
                       name="oldPassword"
                       onChange={onPasswordChange}
                       required
                />
              </div>

              <div className="form-group">
                <label>
                  New Password
                </label>
                <input type="password"
                       className="form-control"
                       placeholder="Password"
                       value={newPassword}
                       name="newPassword"
                       onChange={onPasswordChange}
                       required
                />
              </div>

              <div className="form-group">
                <label> New Password Confirmation</label>
                <input type="password"
                       className="form-control"
                       placeholder="Password"
                       value={newPasswordConf}
                       name="newPasswordConfirmation"
                       onChange={onPasswordChange}
                       required
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
);

ResetPasswordCard.propTypes = {
  onPasswordChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  newPassword: PropTypes.string,
  newPasswordConf: PropTypes.string,
  oldPassword: PropTypes.string,
};