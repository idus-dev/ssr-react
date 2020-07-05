import { createStore } from 'redux';
import rootReducer from '../../client/store/reducers/rootReducer';
// check for :id || :slug
// find :id
// add to req promise function
const extractParam = (req, path) => {
    const regex = /(:id|:slug)/;
    let param;

    if (regex.test(path)) {
        const split = req.url.split('/');
        param = split[split.length - 1];
    }

    return param;
};

const prefetchState = async (route, req) => {
    const states = Object.keys(route.initialState);
    const requests = Object.values(route.initialState).map(promise =>
        promise(extractParam(req, route.path))
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

const prefetchData = async (route, req) => {
    const keys = Object.keys(route.initialData);
    const requests = Object.values(route.initialData).map(promise =>
        promise(extractParam(req, route.path))
    );

    const initialData = {};

    return Promise.all(requests)
        .then(res => {
            res.forEach((data, i) => {
                initialData[keys[i]] = data;
            });

            return initialData;
        })
        .catch(err => {
            return err.response.data;
        });
};

export default async (route, req) => {
    const initialData = route.initialData
        ? await prefetchData(route, req)
        : null;
    const initialState = route.initialState
        ? await prefetchState(route, req)
        : {};

    return {
        initialData,
        initialState: createStore(rootReducer, initialState)
    };
};
