import { createStore } from 'redux';

import rootReducer from '../../client/reducers/rootReducer';

export default (req) => {
    const preloadedState = {};
    const { url } = req;

    // handle preloaded state here
    return createStore(rootReducer, preloadedState);
};