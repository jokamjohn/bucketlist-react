import React from 'react';
import PropTypes from 'prop-types';

export const Modal = ({onSubmit, onChange, saving}) => (
    <div className="modal fade mx-auto"
         id="addItemModal"
         tabIndex="-1"
         role="dialog"
         aria-labelledby="addItemModalLabel"
         aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Item</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input type="text"
                       className="form-control mb-2 mb-sm-0"
                       placeholder="Item Name"
                       onChange={onChange}
                       name="name"
                       required/>
              </div>
              <div className="form-group">
                    <textarea className="form-control"
                              rows="5"
                              placeholder="Item Description"
                              name="description"
                              onChange={onChange}>
                    </textarea>
              </div>
              <div className="form-group">
                <input type="submit" className="btn btn-primary form-control" value={saving ? "Saving" : "Save"}/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
);

Modal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
};