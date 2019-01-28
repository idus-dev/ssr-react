import cors from 'cors';
import express from 'express';
import React from 'react';
import serialize from 'serialize-javascript';
import { renderToString } from 'react-dom/server';
import { matchPath, StaticRouter } from 'react-router-dom';
import routes from '../shared/routes';
import App from '../shared/App';

const app = express();

app.use(cors());
app.use(express.static('public'));

app.get('*', (req, res, next) => {
    const activeRoute = routes.find((route) => matchPath(req.url, route)) || {};

    const promise = activeRoute.fetchInitialData
        ? activeRoute.fetchInitialData(req.path)
        : Promise.resolve();

    promise
        .then((data) => {
            const context = { data };
            const markup = renderToString(
                <StaticRouter location={req.url} context={context}><App /></StaticRouter>
            );
            res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
                    <title>SSR with RR</title>
                    <script src="/client.js" defer></script>
                    <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
                </head>
                <body>
                    <div id="app">${markup}</div>
                </body>
                </html>
            `);
        })
        .catch(next);
});

/* eslint-disable no-console */
app.listen(3000, () => console.log('listening on 3000'));