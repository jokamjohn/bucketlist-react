import React from 'react';
import {Route, Redirect} from "react-router-dom";
import PropTypes from 'prop-types';
import Logout from '../../components/auth/Logout'

export const LogoutRoute = ({isAuthenticated, dispatch, ...rest}) => (
    <Route {...rest} render={props => (
        isAuthenticated ? (
            <Logout {...props} isAuthenticated={isAuthenticated} dispatch={dispatch}/>
        ) : (
            <Redirect to={{
              pathname: '/login'
            }}/>
        )
    )}/>
);

LogoutRoute.propTypes = {
  path: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

