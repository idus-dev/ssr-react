import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import * as action from '../action/counter';

const Counter = ({ counter, increment, decrement }) => (
    <div>
        <button type="button" onClick={decrement}>
            -
        </button>
        <button type="button" onClick={increment}>
            +
        </button>
        <span>{counter}</span>
    </div>
);

Counter.propTypes = {
    counter: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        counter: state.counter
    };
}

export default connect(
    mapStateToProps,
    {
        increment: action.increment,
        decrement: action.decrement
    }
)(Counter);
