import React from 'react'
import PropTypes from 'prop-types'
import {deleteItem, editItem} from "../../actions/items";
import {formatDate} from "../../utilities/Utils";

class Item extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      description: props.description,
      isEditing: false,
    }
  }

  onChangeName = value => this.setState({name: value});

  onChangeDescription = value => this.setState({description: value});

  onEditing = () => this.setState({isEditing: true});

  onSaving = () => {
    this.setState({isEditing: false});
    const {bucketId, id: itemId, index, isAuthenticated, dispatch} = this.props;
    const {name, description} = this.state;
    dispatch(editItem(bucketId, itemId, index, name, description, isAuthenticated))
  };

  onCancel = () => this.setState({isEditing: false});

  onDelete = () => {
    const {bucketId, id: itemId, index, isAuthenticated, dispatch} = this.props;
    dispatch(deleteItem(bucketId, itemId, index, isAuthenticated));
  };


  render() {
    const {name, description, isEditing} = this.state;
    const {modifiedAt} = this.props;
    return (
        <div className="col-sm-4 bucket-card">
          <div className="card">
            <div className="card-body">
              {isEditing ?
                  <div>
                    <input type="text"
                           value={name}
                           onChange={event => this.onChangeName(event.target.value)}
                    />
                    <textarea className="form-control"
                              rows="5"
                              onChange={event => this.onChangeDescription(event.target.value)}
                              placeholder="Item Description" value={description}>
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
                    <button className="btn btn-primary bucket-links" onClick={this.onSaving}>Save</button>
                    <button className="btn btn-info" onClick={this.onCancel}>Cancel</button>
                  </div>
                  :
                  <div>
                    <button className="btn btn-primary bucket-links" onClick={this.onEditing}>Edit</button>
                    <button className="btn btn-danger" onClick={this.onDelete}>Delete</button>
                  </div>
              }
            </div>
          </div>
        </div>
    );
  }
}

Item.propTypes = {
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  modifiedAt: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  bucketId: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};

export default Item