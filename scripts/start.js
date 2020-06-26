const { prepareUrls } = require('react-dev-utils/WebpackDevServerUtils');
const clearConsole = require('react-dev-utils/clearConsole');
const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
const https = require('https');
const openBrowser = require('react-dev-utils/openBrowser');
const path = require('path');
const applyDevMiddleware = require('./utils/applyDevMiddleware');
const purgeCacheOnChange = require('./utils/purgeCacheOnChange');

const isDevelopment = process.env.NODE_ENV !== 'production';
const isInteractive = process.stdout.isTTY;

// if (process.env.NODE_ENV !== 'production')
let server = express();

if (isDevelopment) {
    dotenv.config({ path: '.env.local' });
    applyDevMiddleware(server);
}

const host = process.env.DOMAIN || 'localhost';
let port = process.env.PORT || 3000;
let protocol = 'http';

server.use((req, res) => {
    // We use "require" inside this function
    // so that when purgeCacheOnChange() runs we pull in the most recent code.
    // https://codeburst.io/dont-use-nodemon-there-are-better-ways-fc016b50b45e

    /* eslint-disable global-require */
    const { app } = isDevelopment
        ? require('../src/server/index')
        : require('../build/server');

    app(req, res);
});

// development ssl 설정
if (isDevelopment) {
    try {
        const privateKey = fs.readFileSync(`./${host}-key.pem`);
        const certificate = fs.readFileSync(`./${host}.pem`);
        const credentials = { key: privateKey, cert: certificate };
        const devHttpsServer = https.createServer(credentials, server);

        port = 443;
        protocol = 'https';
        server = devHttpsServer;
    } catch (err) {
        console.log(err);
    }
}

server.listen(port, () => {
    if (isDevelopment) {
        const urls = prepareUrls(protocol, host, port);

        if (isInteractive) clearConsole();
        openBrowser(urls.localUrlForBrowser);
        purgeCacheOnChange(path.resolve(__dirname, '../'));
    }
    /* eslint-disable no-console */
    console.log(`Server started on port:${port} | env=${process.env.NODE_ENV}`);
});
