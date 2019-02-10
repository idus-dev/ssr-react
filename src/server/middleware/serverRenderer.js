import path from 'path';
import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import serialize from 'serialize-javascript';

import App from '../../shared/App';

export default (store, data) => (req, res) => {
    const filePath = process.env.NODE_ENV === 'production' ? path.resolve(__dirname, 'template.html') : './public/template.html';
    const preloadedState = store.getState();
    const context = { data };
    const html = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url ? req.url : '/'} context={context}><App /></StaticRouter>
        </Provider>
    );

    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if (err) {
            return res.status(404).end();
        }

        return res.send(
            htmlData
                .replace('__PRELOADED_STATE__={}', `__PRELOADED_STATE__=${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}`)
                .replace('__INITIAL_DATA__={}', `__INITIAL_DATA__=${serialize(data)}`)
                .replace('<div id="app"></div>', `<div id="app">${html}</div>`)
        );
    });
};
