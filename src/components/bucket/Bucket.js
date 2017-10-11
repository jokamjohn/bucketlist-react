import React from 'react'
import PropTypes from 'prop-types'
import {deleteBucket} from "../../actions/buckets";

const Bucket = props => (
    <div className="col-sm-4">
      <div className="card bucket-card">
        <div className="card-body">
          <h4 className="card-title">{props.name}</h4>
          <p className="card-text">
            <small>Last Modified: {props.modifiedAt}</small>
          </p>
          <a href="#" className="btn btn-primary bucket-links">Edit</a>
          <a href="#" className="btn btn-danger" onClick={() => props.dispatch(deleteBucket(props.index))}>Delete</a>
        </div>
      </div>
    </div>);

Bucket.propTypes = {
  name: PropTypes.string,
  modifiedAt: PropTypes.string,
  index: PropTypes.number,
  dispatch: PropTypes.func,
};

export default Bucket