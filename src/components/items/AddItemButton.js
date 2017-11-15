import React from 'react';

export const AddItemButton = props => (
    <div className="row">
      <div className="col-sm-5 mx-sm-auto">
        <button type="button" className="btn btn-primary" data-toggle="modal"
                data-target="#addItemModal">
          Add BucketItem
        </button>
      </div>
    </div>
);