import { createStore } from 'redux';

import rootReducer from '../../client/reducers/rootReducer';

export default () => {
    const preloadedState = {};

    // set initial state from server
    preloadedState.counter = 5;

    preloadedState.notification = {
        timestamp: 123122,
        message: 'before rendering'
    };

    // handle preloaded state here
    return createStore(rootReducer, preloadedState);
};