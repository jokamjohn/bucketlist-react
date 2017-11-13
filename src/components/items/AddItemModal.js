import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {createItem} from "../../actions/items";

class AddItemModal extends React.Component {

  onSubmit = (event) => {
    event.preventDefault();
    const name = this.name.value;
    const description = this.description.value;
    const authenticated = this.props.isAuthenticated;
    let bucketId = this.props.bucketId;
    this.props.dispatch(createItem(bucketId, name, description, authenticated,
        () => window.location.reload()))
  };

  render() {
    return (
        <div className="modal fade mx-auto" id="addItemModal" tabIndex="-1" role="dialog"
             aria-labelledby="addItemModalLabel"
             aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add New Item</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input type="text" className="form-control mb-2 mb-sm-0"
                           placeholder="Item Name" ref={input => this.name = input} required/>
                  </div>
                  <div className="form-group">
                    <textarea className="form-control" rows="5" placeholder="Item Description"
                              ref={input => this.description = input}></textarea>
                  </div>
                  <div className="form-group">
                    <input type="submit" className="btn btn-primary form-control" value="Save"/>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

AddItemModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  bucketId: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};


export default withRouter(AddItemModal)