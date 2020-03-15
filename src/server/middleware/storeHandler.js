import { createStore } from 'redux';

import rootReducer from '../../client/store/reducers/rootReducer';

const prefetchApi = async route => {
    const states = Object.keys(route.prefetch);
    const requests = Object.values(route.prefetch).map(promise => promise());
    const initialState = {};

    return Promise.all(requests).then(res => {
        res.forEach((data, i) => {
            initialState[states[i]] = data;
        });
        return initialState;
    });
};

export default async route => {
    const preloadedState = route.prefetch ? await prefetchApi(route) : {};

    return createStore(rootReducer, preloadedState);
};
