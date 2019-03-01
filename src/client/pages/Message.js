import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../action/notification';

class Message extends Component {
    componentDidMount() {
        const { fetchNotification } = this.props;
        fetchNotification();
    }

    render() {
        return (
            <div>
                aa
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        message: state.message,
    };
}

export default connect(mapStateToProps, { fetchNotification: action.fetchNotification })(Message);