import { createStore } from 'redux';

import rootReducer from '../../client/reducers/rootReducer';

export default (data) => {
    const preloadedState = {};

    // set initial state from server
    preloadedState.counter = 5;
    preloadedState.prefetched = data;

    // handle preloaded state here
    return createStore(rootReducer, preloadedState);
};