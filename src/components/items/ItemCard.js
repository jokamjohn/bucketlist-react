import React from 'react';
import PropTypes from 'prop-types';
import {formatDate} from "../../utilities/Utils";

export const ItemCard = ({onChange, onUpdate, onEditing, onDelete, onCancel, modifiedAt, name, description, isEditing, updating, deleting}) => (
    <div className="col-sm-4 bucket-card">
      <div className="card">
        <div className="card-body">
          {isEditing ?
              <div>
                <input type="text"
                       value={name}
                       name="name"
                       onChange={onChange}
                />
                <textarea className="form-control"
                          rows="5"
                          name="description"
                          onChange={onChange}
                          placeholder="Item Description"
                          value={description}>
                    </textarea>
              </div>
              :
              <div>
                <h4 className="card-title">{name}</h4>
                <p className="card-text">{description}</p>
              </div>
          }
          <h6 className="card-subtitle mb-2 text-muted">
            {formatDate(modifiedAt)}
          </h6>
          {isEditing ?
              <div>
                <button className="btn btn-primary bucket-links" onClick={onUpdate}>Update</button>
                <button className="btn btn-info" onClick={onCancel}>Cancel</button>
              </div>
              :
              <div>
                <button className="btn btn-primary bucket-links" onClick={onEditing}>
                  {updating ? "Updating" : "Edit"}
                </button>
                <button className="btn btn-danger" onClick={onDelete}>
                  {deleting ? "Deleting" : "Delete"}
                </button>
              </div>
          }
        </div>
      </div>
    </div>
);

ItemCard.propTypes = {
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onEditing: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  modifiedAt: PropTypes.string.isRequired,
};
