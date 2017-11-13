import React from 'react';

export const ItemSearch = props => (
    <div className="col-sm-5 mx-sm-auto">
      <form className="form-inline">
        <div className="form-group">
          <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0"
                 placeholder="Food" required/>
          <input type="submit" className="btn btn-primary" value="Search"/>
        </div>
      </form>
    </div>
);