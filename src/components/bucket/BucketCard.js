import React from 'react';
import {formatDate} from "../../utilities/Utils";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {bucketType} from "../../types/index";

export const BucketCard = ({id, modifiedAt, name, isEditing, onChange, onSave, onEditing, onDelete, deleting, updating, onCancel}) => (
    <div className="col-sm-4">
      <div className="card bucket-card">
        <div className="card-body">
          {isEditing ?
              <input type="text" value={name} onChange={event => onChange(event.target.value)}/>
              :
              <h4 className="card-title"><Link to={`/buckets/${id}/items`}>{name}</Link></h4>
          }
          <p className="card-text">
            <small>Last Modified: {formatDate(modifiedAt)}</small>
          </p>
          {isEditing ?
              <div>
                <button className="btn btn-primary bucket-links" onClick={onSave}>Update</button>
                <button className="btn btn-info" onClick={onCancel}>Cancel</button>
              </div>
              :
              <div>
                <button className="btn btn-primary bucket-links" onClick={onEditing}>
                  {updating ? "Updating" : "Edit"}
                </button>
                <button className="btn btn-danger" onClick={onDelete}>
                  {deleting ? 'Deleting' : 'Delete'}
                </button>
              </div>
          }
        </div>
      </div>
    </div>
);

BucketCard.propTypes = {
  ...bucketType,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onEditing: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};