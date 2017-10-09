import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {logoutUser} from "../../actions/logout";

class Logout extends React.Component {

    componentWillMount() {
        this.props.dispatch(logoutUser());
        this.props.history.push('/');
    }

    render() {
        return null

    }
}

Logout.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

export default withRouter(Logout)