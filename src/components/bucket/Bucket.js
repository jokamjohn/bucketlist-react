import React from 'react'
import PropTypes from 'prop-types'
import {deleteBucketFromServer, editBucketOnServer} from "../../actions/buckets";
import {Link} from 'react-router-dom';
import {formatDate} from "../../utilities/Utils";


class Bucket extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      isEditing: false
    }
  }

  onChangeName = (value) => this.setState({name: value});

  onEditing = () => this.setState({isEditing: true});

  onSaving = () => {
    const {id, isAuthenticated, dispatch} = this.props;
    dispatch(editBucketOnServer(this.state.name, id, isAuthenticated));
    this.setState({isEditing: false})
  };

  render() {
    const {id, index, isAuthenticated, modifiedAt, dispatch} = this.props;
    const {name, isEditing} = this.state;
    return (
        <div className="col-sm-4">
          <div className="card bucket-card">
            <div className="card-body">
              {isEditing ?
                  <input type="text" value={name} onChange={event => this.onChangeName(event.target.value)}/>
                  :
                  <h4 className="card-title"><Link to={`/buckets/${id}/items`}>{name}</Link></h4>
              }
              <p className="card-text">
                <small>Last Modified: {formatDate(modifiedAt)}</small>
              </p>
              {isEditing ?
                  <button className="btn btn-primary bucket-links" onClick={this.onSaving}>Save</button>
                  :
                  <button className="btn btn-primary bucket-links" onClick={this.onEditing}>Edit</button>
              }
              <button className="btn btn-danger"
                      onClick={() => dispatch(deleteBucketFromServer(id, index, isAuthenticated))}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
    );
  }
}

Bucket.propTypes = {
  name: PropTypes.string,
  modifiedAt: PropTypes.string,
  index: PropTypes.number,
  id: PropTypes.number,
  isAuthenticated: PropTypes.bool,
  dispatch: PropTypes.func,
};

export default Bucket