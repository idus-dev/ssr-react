import { createStore } from 'redux';

import rootReducer from '../../client/store/reducers/rootReducer';

export default data => {
    const preloadedState = {};

    console.log(data);

    return createStore(rootReducer, preloadedState);
};
