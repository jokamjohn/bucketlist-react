import React from 'react';
import PropTypes from 'prop-types';

export const FormTip = ({message}) => (
    <small className="form-text text-muted">
      {message}
    </small>
);

FormTip.propTypes = {
  message: PropTypes.string.isRequired,
};