import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Notification = ({ notification }) =>
    notification
        ? <div>{notification.message}</div>
        : '';

function mapStateToProps(state) {
    return {
        notification: state.notification
    };
};

Notification.defaultProps = {
    notification: undefined
};

Notification.propTypes = {
    notification: PropTypes.shape({
        timestamp: PropTypes.number,
        message: PropTypes.string,
    }),
};

export default connect(mapStateToProps, null)(Notification);