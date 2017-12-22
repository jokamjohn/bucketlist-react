import React from 'react';

export const AddItemButton = () => (
    <div className="row">
      <div className="col-sm-5 mx-sm-auto">
        <button type="button" className="btn btn-primary" data-toggle="modal"
                data-target="#addItemModal">
          Add BucketItem
        </button>
      </div>
    </div>
);