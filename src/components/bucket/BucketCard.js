import React from 'react';
import {formatDate} from "../../utilities/Utils";
import {Link} from "react-router-dom";
import {deleteBucketFromServer} from "../../actions/buckets";
import PropTypes from 'prop-types';
import {bucketType} from "../../types/index";

export const BucketCard = ({id, index, isAuthenticated, modifiedAt, dispatch, name, isEditing, onChangeName, onSaving, onEditing}) => (
    <div className="col-sm-4">
      <div className="card bucket-card">
        <div className="card-body">
          {isEditing ?
              <input type="text" value={name} onChange={event => onChangeName(event.target.value)}/>
              :
              <h4 className="card-title"><Link to={`/buckets/${id}/items`}>{name}</Link></h4>
          }
          <p className="card-text">
            <small>Last Modified: {formatDate(modifiedAt)}</small>
          </p>
          {isEditing ?
              <button className="btn btn-primary bucket-links" onClick={onSaving}>Save</button>
              :
              <button className="btn btn-primary bucket-links" onClick={onEditing}>Edit</button>
          }
          <button className="btn btn-danger"
                  onClick={() => dispatch(deleteBucketFromServer(id, index, isAuthenticated))}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
);

BucketCard.propTypes = {
  ...bucketType,
  onChangeName: PropTypes.func.isRequired,
  onSaving: PropTypes.func.isRequired,
  onEditing: PropTypes.func.isRequired,
};