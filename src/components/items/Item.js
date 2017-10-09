import React from 'react'
import PropTypes from 'prop-types'

const Item = props =>
  <div className="col-sm-4 bucket-card">
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">{props.name}</h4>
        <h6 className="card-subtitle mb-2 text-muted">{props.modifiedAt}</h6>
        <p className="card-text">
          {props.description}
        </p>
      </div>
    </div>
  </div>;

Item.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  modifiedAt: PropTypes.string.isRequired
};

export default Item