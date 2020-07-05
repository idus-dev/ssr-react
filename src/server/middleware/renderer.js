import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { StaticRouter } from 'react-router-dom';
import fs from 'fs';
import React from 'react';
import branch from 'git-branch';

import App from '../../client/App';
import preRenderFetch from './preRenderFetch';

const templatePath = process.env.NODE_ENV === 'production' ? 'build' : 'dev';
const filePath = `./${templatePath}/app-shell.html`;
const branchLabel =
    process.env.NODE_ENV === 'development'
        ? `<span style="position:fixed; right:0; top:0; color: #fff; background: rgba(0,0,0,0.3); padding: 2px 5px">${branch.sync()}</span>`
        : '';

export default activeRoute => async (req, res, next) => {
    const { initialData, initialState } = await preRenderFetch(
        activeRoute,
        req
    );
    const sheet = new ServerStyleSheet();
    const helmet = Helmet.renderStatic();
    const html = renderToString(
        sheet.collectStyles(
            <Provider store={initialState}>
                <StaticRouter location={req.url} context={initialData}>
                    <App />
                </StaticRouter>
            </Provider>
        )
    );

    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if (err) next(err);

        return res.send(
            htmlData
                .replace('<title></title>', helmet.title.toString())
                .replace('<style></style>', sheet.getStyleTags())
                .replace(
                    '__INITIAL_STATE__ = null;',
                    `__INITIAL_STATE__ = ${JSON.stringify(
                        initialState.getState()
                    ).replace(/</g, '\\u003c')}`
                )
                .replace(
                    '__INITIAL_DATA__ = null;',
                    `__INITIAL_DATA__ = ${JSON.stringify(initialData).replace(
                        /</g,
                        '\\u003c'
                    )}`
                )
                .replace(
                    '<div id="app"></div>',
                    `<div id="app">${html}</div>${branchLabel}`
                )
        );
    });
};
