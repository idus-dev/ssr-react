import { createStore } from 'redux';

import rootReducer from '../../client/store/reducers/rootReducer';

export default data => {
    const preloadedState = {};
    // TODO : remove hard-coding
    preloadedState.todos = data;

    return createStore(rootReducer, preloadedState);
};
