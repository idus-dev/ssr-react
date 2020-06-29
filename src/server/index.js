import { matchPath } from 'react-router-dom';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';

import { logger, accessLogger } from './middleware/logger';
import renderer from './middleware/renderer';
import errorHandler from './middleware/errorHandler';
import ssrRoutes from './ssrRoutes';
import todoRoutes from './api/todoRoutes';

// use docker ENV for production
if (process.env.NODE_ENV !== 'production')
    dotenv.config({ path: '.env.local' });

const STATIC = process.env.NODE_ENV === 'production' ? 'build' : 'dev';

// should process.exit(1) & restart process
process.on('uncaughtException', ex => logger.error(ex.message, ex));
process.on('unhandledRejection', ex => logger.error(ex.message, ex));

/* eslint-disable import/prefer-default-export */
export const app = express();

// gzip middleware
app.get('*.js.gz', (req, res, next) => {
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/javascript');
    next();
});

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(STATIC));
app.use(express.static('./public')); // extra assets

// internal api endpoints
app.use(express.json());

app.use(todoRoutes());

// renderer
app.get('*', (req, res, next) => {
    const activeRoute =
        ssrRoutes.find(route => matchPath(req.url, route)) || {};
    renderer(activeRoute)(req, res, next);
});

if (process.env.NODE_ENV === 'production') {
    // handle server error
    app.use(errorHandler);
    // accessLogger
    app.use(accessLogger);
}
