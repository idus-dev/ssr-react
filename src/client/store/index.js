/* eslint-disable no-shadow */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

// Grab the state from a global variable injected into the server-generated HTML
/* eslint-disable no-underscore-dangle */
const preloadedState = window.__PRELOADED_STATE__;
// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

let middleware;
// remove redux-devtool in production
if (process.env.NODE_ENV === 'production') {
    middleware = applyMiddleware(thunk);
} else {
    /* eslint-disable global-require */
    middleware = require('redux-devtools-extension').composeWithDevTools(
        applyMiddleware(thunk)
    );
}

const store = createStore(rootReducer, preloadedState, middleware);

export default store;
