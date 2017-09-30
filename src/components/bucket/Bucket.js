import React from 'react'
import PropTypes from 'prop-types'

const Bucket = props =>
  <div className="col-sm-4">
    <div className="card bucket-card">
      <div className="card-body">
        <h4 className="card-title">{props.name}</h4>
        <h6 className="card-subtitle mb-2 text-muted">{props.createdAt}</h6>
        <p className="card-text">
          {props.modifiedAt}
        </p>
      </div>
    </div>
  </div>

Bucket.propTypes = {
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  modifiedAt: PropTypes.string.isRequired
}

export default Bucket