// polyfills
import 'core-js/fn/set';
import 'core-js/fn/promise';
import 'core-js/es6/map';

import { BrowserRouter } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import thunk from 'redux-thunk';

import App from '../shared/App';
import rootReducer from '../shared/rootReducer';

/* eslint-disable no-underscore-dangle */
// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

// Create Redux store with initial state
const store = createStore(rootReducer, preloadedState, composeWithDevTools(applyMiddleware(
    thunk
)));

hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);

if (process.env.NODE_ENV === 'development') {
    /* eslint-disable global-require */
    require('webpack-hot-middleware/client');
    if (module.hot) {
        module.hot.accept();
        // module.hot.accept('./reducers', () => {
        //     store.replaceReducer(require('./reducers').default);
        // });
    }
}