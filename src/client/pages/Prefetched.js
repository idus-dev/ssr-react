import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../action/prefetch';

class Prefetched extends Component {
    componentDidMount() {
        const { prefetchUrl, history } = this.props;

        prefetchUrl(history.location.pathname);
    }

    render() {
        const { prefetched } = this.props;
        const template = prefetched.map(item => (
            <div key={item.name}>{item.name}</div>
        ));

        return <div>{template}</div>;
    }
}

Prefetched.propTypes = {
    prefetchUrl: PropTypes.func.isRequired,
    history: PropTypes.shape({
        location: PropTypes.shape({
            pathname: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    prefetched: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

function mapStateToProps(state) {
    return {
        prefetched: state.prefetched
    };
}

export default connect(
    mapStateToProps,
    { prefetchUrl: actions.prefetchUrl }
)(Prefetched);
