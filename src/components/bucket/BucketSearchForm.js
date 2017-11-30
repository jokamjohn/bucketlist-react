import React from 'react';
import PropTypes from 'prop-types';

export const BucketSearchForm = ({onSubmit, onChange, searching}) => (
    <div className="col-sm-5 mx-sm-auto">
      <form className="form-inline" onSubmit={onSubmit}>
        <div className="form-group">
          <input
              type="text"
              className="form-control mb-2 mr-sm-2 mb-sm-0"
              placeholder="Search"
              onChange={onChange}
              required
          />
          <input
              type="submit"
              className="btn btn-secondary"
              value={searching ? "Searching" : "Search"}
          />
        </div>
      </form>
    </div>
);

BucketSearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  searching: PropTypes.bool.isRequired,
};
