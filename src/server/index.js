import cors from 'cors';
import express from 'express';
import React from 'react';
import serialize from 'serialize-javascript';
import { renderToString } from 'react-dom/server';
import App from '../shared/App';

import fetchPopularReops from '../shared/api';

const app = express();

app.use(cors());
app.use(express.static('public'));

app.get('*', (req, res) => {
    fetchPopularReops('js').then(data => {
        const markup = renderToString(<App data={data} />);

        res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
            <title>SSR with RR</title>
            <script src="/bundle.js" defer></script>
            <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
        </head>
        <body>
            <div id="app">${markup}</div>
        </body>
        </html>
    `);
    });
});

/* eslint-disable no-console */
app.listen(3000, () => console.log('listening on 3000'));