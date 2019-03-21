import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { StaticRouter } from 'react-router-dom';
import fs from 'fs';
import React from 'react';
import serialize from 'serialize-javascript';

import App from '../../client/App';

const templatePath = process.env.NODE_ENV === 'production'
    ? 'dist'
    : 'dev';

const filePath = `./${templatePath}/app-shell.html`;

export default (store, data) => (req, res, next) => {
    const preloadedState = store.getState();
    const context = { data };
    const sheet = new ServerStyleSheet();
    const helmet = Helmet.renderStatic();
    const html = renderToString(
        sheet.collectStyles(
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}><App /></StaticRouter>
            </Provider>
        )
    );

    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if (err) next(err);

        return res.send(
            htmlData
                .replace('<title></title>', helmet.title.toString())
                .replace('<style></style>', sheet.getStyleTags())
                .replace('__INITIAL_DATA__={}', `__INITIAL_DATA__=${serialize(data)}`)
                .replace('__PRELOADED_STATE__={}', `__PRELOADED_STATE__=${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}`)
                .replace('<div id="app"></div>', `<div id="app">${html}</div>`)
        );
    });
};
