import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { StaticRouter } from 'react-router-dom';
import fs from 'fs';
import React from 'react';
import serialize from 'serialize-javascript';

import App from '../../shared/App';

const templatePath = process.env.NODE_ENV === 'production' ? 'dist' : 'dev';

export default (store, data) => (req, res) => {
    const filePath = `./${templatePath}/template.html`;
    const sheet = new ServerStyleSheet();
    const preloadedState = store.getState();
    const context = { data };
    const html = renderToString(
        sheet.collectStyles(
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}><App /></StaticRouter>
            </Provider>
        )
    );

    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if (err) {
            return res.status(404).end();
        }

        // context.url will contain the URL to redirect to if a <Redirect> was used
        if (context.url) {
            return res.writeHead(302, {
                Location: context.url
            });
        }

        return res.send(
            htmlData
                .replace('<style></style>', `<style>${sheet.getStyleTags()}</style>`)
                .replace('__PRELOADED_STATE__={}', `__PRELOADED_STATE__=${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}`)
                .replace('__INITIAL_DATA__={}', `__INITIAL_DATA__=${serialize(data)}`)
                .replace('<div id="app"></div>', `<div id="app">${html}</div>`)
        );
    });
};
