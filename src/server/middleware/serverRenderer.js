import path from 'path';
import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import serialize from 'serialize-javascript';

// import our main App component
import App from '../../shared/App';

// import the manifest generated with the create-react-app build
// import manifest from '../../build/asset-manifest.json';

// function to extract js assets from the manifest
// const extractAssets = (assets, chunks) => Object.keys(assets)
//     .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
//     .map(k => assets[k]);

export default (store, data) => (req, res) => {
    const filePath = process.env.NODE_ENV === 'production' ? path.resolve(__dirname, 'index.html') : './dev/index.html';

    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('err', err);
            return res.status(404).end();
        }

        const preloadedState = store.getState();
        const context = { data };
        const html = renderToString(
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}><App /></StaticRouter>
            </Provider>
        );

        res.send(
            htmlData
                .replace('__PRELOADED_STATE__={}', `__PRELOADED_STATE__=${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}`)
                .replace('__INITIAL_DATA__={}', `__INITIAL_DATA__=${serialize(data)}`)
                .replace('<div id="app"></div>', `<div id="app">${html}</div>`)
        );
    });

    // res.send(`
    //     <!DOCTYPE html>
    //     <html lang="en">
    //     <head>
    //         <meta charset="UTF-8"/>
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    //         <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    //         <title>SSR with RR</title>
    //         <script src="/client.js" defer></script>
    //         <script> window.__PRELOADED_STATE__= ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}; window.__INITIAL_DATA__ = ${serialize(data)}</script>
    //     </head>
    //     <body>
    //         <div id="app">${html}</div>
    //     </body>
    //     </html>
    // `);
};

// export default (store) => (req, res, next) => {
//     // get the html file created with the create-react-app build
//     const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');

//     fs.readFile(filePath, 'utf8', (err, htmlData) => {
//         if (err) {
//             console.error('err', err);
//             return res.status(404).end()
//         }

//         const modules = [];
//         const routerContext = {};

//         // render the app as a string
//         const html = ReactDOMServer.renderToString(
//             <Loadable.Capture report={m => modules.push(m)}>
//                 <ReduxProvider store={store}>
//                     <StaticRouter location={req.baseUrl} context={routerContext}>
//                         <App/>
//                     </StaticRouter>
//                 </ReduxProvider>
//             </Loadable.Capture>
//         );

//         // get the stringified state
//         const reduxState = JSON.stringify(store.getState());

//         // map required assets to script tags
//         const extraChunks = extractAssets(manifest, modules)
//             .map(c => `<script type="text/javascript" src="/${c}"></script>`);

//         // get HTML headers
//         const helmet = Helmet.renderStatic();

//         // now inject the rendered app into our html and send it to the client
//         return res.send(
//             htmlData
//                 // write the React app
//                 .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
//                 // write the string version of our state
//                 .replace('__REDUX_STATE__={}', `__REDUX_STATE__=${reduxState}`)
//                 // append the extra js assets
//                 .replace('</body>', extraChunks.join('') + '</body>')
//                 // write the HTML header tags
//                 .replace('<title></title>', helmet.title.toString() + helmet.meta.toString())
//         );
//     });
// }