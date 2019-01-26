import React from 'react';
import { hydrate } from 'react-dom';
import App from '../shared/App';

/* eslint-disable no-underscore-dangle */
hydrate(<App data={window.__INITIAL_DATA__} />, document.getElementById('app'));
