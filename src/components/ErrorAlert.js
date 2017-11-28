import React from 'react';
import PropTypes from 'prop-types';

export const ErrorAlert = ({message}) => (
    <div className="alert alert-warning" role="alert">
      {message}
    </div>
);

ErrorAlert.propTypes = {
  message: PropTypes.string.isRequired,
};

