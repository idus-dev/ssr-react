import express from 'express';
import { matchPath } from 'react-router-dom';

import { logger, accessLogger } from './middleware/logger';
import renderer from './middleware/renderer';
import storeHandler from './middleware/storeHandler';
import errorHandler from './middleware/errorHandler';
import routes from '../client/routes';

import routerNotification from './api/notification';

const STATIC = process.env.NODE_ENV === 'production' ? 'dist' : 'dev';

const PORT = process.env.NODE_ENV === 'production' ? 8080 : 3000;

// should process.exit(1) & restart process
process.on('uncaughtException', ex => logger.error(ex.message, ex));
process.on('unhandledRejection', ex => logger.error(ex.message, ex));

const app = express();

/* eslint-disable global-require */
if (process.env.NODE_ENV === 'development') {
    const webpack = require('webpack');
    const config = require('../../webpack.config');
    const compiler = webpack(config[0]);

    app.use(
        require('webpack-dev-middleware')(compiler, {
            noInfo: true,
            publicPath: config[0].output.publicPath,
            stats: {
                assets: false,
                colors: true,
                version: false,
                hash: false,
                timings: false,
                chunks: false,
                chunkModules: false
            }
        })
    );
    app.use(require('webpack-hot-middleware')(compiler));
}

// gzip middleware
app.get('*.js.gz', (req, res, next) => {
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/javascript');
    next();
});

// STATIC files
app.use(express.static(STATIC));

// internal api endpoints
app.use(express.json());
app.use('/api/notification', routerNotification);

// renderer
app.get('*', (req, res, next) => {
    const activeRoute = routes.find(route => matchPath(req.url, route)) || {};
    const beforeRender = activeRoute.preFetch
        ? activeRoute.preFetch()
        : Promise.resolve();

    beforeRender
        .then(data => renderer(storeHandler(data, req))(req, res, next))
        .catch(next);
});

if (process.env.NODE_ENV === 'production') {
    // handle server error
    app.use(errorHandler);
    // accessLogger
    app.use(accessLogger);
}

/* eslint-disable no-console */
app.listen(PORT, () =>
    console.log(`listening on ${PORT} NODE_ENV="${process.env.NODE_ENV}"`)
);
