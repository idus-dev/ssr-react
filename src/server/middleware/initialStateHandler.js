import { createStore } from 'redux';

import rootReducer from '../../client/store/reducers/rootReducer';

const prefetchApi = async route => {
    const states = Object.keys(route.initialState);
    const requests = Object.values(route.initialState).map(promise =>
        promise()
    );
    const initialState = {};

    initialState.ssr = true;

    return Promise.all(requests).then(res => {
        res.forEach((data, i) => {
            initialState[states[i]] = data;
        });
        return initialState;
    });
};

export default async route => {
    const preloadedState = route.initialState ? await prefetchApi(route) : {};

    return createStore(rootReducer, preloadedState);
};
