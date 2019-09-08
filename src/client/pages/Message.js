import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as action from '../action/notification';

class Message extends Component {
    componentDidMount() {
        const { fetchNotification } = this.props;
        fetchNotification();
    }

    render() {
        return <div>fetching notification...</div>;
    }
}

function mapStateToProps(state) {
    return {
        message: state.message
    };
}

Message.propTypes = {
    fetchNotification: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    { fetchNotification: action.fetchNotification }
)(Message);
