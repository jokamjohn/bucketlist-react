import React from 'react'
import PropTypes from 'prop-types'
import {deleteItem} from "../../actions/items";

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

  onSaving = () => this.setState({isEditing: false});

  onCancel = () => this.setState({isEditing: false});

  onDelete = () => this.props.dispatch(deleteItem(this.props.bucketId, this.props.itemId,
      this.props.index, this.props.isAuthenticated));


  render() {
    return (
        <div className="col-sm-4 bucket-card">
          <div className="card">
            <div className="card-body">
              {this.state.isEditing ?
                  <div>
                    <input type="text" value={this.state.name}
                           onChange={event => this.onChangeName(event.target.value)}/>
                    <textarea className="form-control" rows="5"
                              onChange={event => this.onChangeDescription(event.target.value)}
                              placeholder="Item Description" value={this.state.description}>
                    </textarea>
                  </div>
                  :
                  <div>
                    <h4 className="card-title">{this.props.name}</h4>
                    <p className="card-text">{this.props.description}</p>
                  </div>
              }
              <h6 className="card-subtitle mb-2 text-muted">{this.props.modifiedAt}</h6>
              {this.state.isEditing ?
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
  itemId: PropTypes.number.isRequired,
  bucketId: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};

export default Item