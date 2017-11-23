import React from 'react';
import PropTypes from 'prop-types';
import {searchForItem} from "../../actions/items";

class ItemSearch extends React.Component {

  onSubmit = event => {
    event.preventDefault();
    const query = this.query.value;
    const {bucketId, isAuthenticated, dispatch} = this.props;
    dispatch(searchForItem(query, bucketId, isAuthenticated))
  };

  render() {
    return (
        <div className="col-sm-5 mx-sm-auto">
          <form className="form-inline">
            <div className="form-group">
              <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" ref={input => this.query = input}
                     placeholder="search items..." required/>
              <input type="submit" className="btn btn-primary" value="Search" onClick={this.onSubmit}/>
            </div>
          </form>
        </div>
    );
  }
}

ItemSearch.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  bucketId: PropTypes.string.isRequired,
};


export default ItemSearch