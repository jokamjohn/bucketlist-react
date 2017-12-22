import React from 'react';
import PropTypes from 'prop-types';

export const BucketForm = ({onSubmit, onChange, saving}) => (
    <div className="col-sm-5 mx-sm-auto">
      <form className="form-inline" onSubmit={onSubmit}>
        <div className="form-group">
          <input
              type="text"
              className="form-control mb-2 mr-sm-2 mb-sm-0"
              placeholder="Travel"
              onChange={event => onChange(event)}
              required/>
          <input
              type="submit"
              className="btn btn-primary"
              value={saving ? "Saving Bucket" : "Create Bucket"}/>
        </div>
      </form>
    </div>);

BucketForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};