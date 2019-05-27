const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const OfflinePlugin = require('offline-plugin');
const webpack = require('webpack');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const Dotenv = require('dotenv-webpack');

const client = {
    mode: 'development',
    entry: './src/client/index.js',
    devtool: 'eval',
    output: {
        path: path.resolve(__dirname, 'dev'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(png|ico|svg|jpg|gif)$/,
                use: 'file-loader?name=./assets/images/[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __isBrowser__: 'true'
        }),
        new Dotenv({
            path: path.resolve(process.cwd(), '.env')
        }),
        new HtmlWebpackPlugin({
            template: 'src/client/app-shell.html',
            filename: 'app-shell.html',
            favicon: 'src/client/favicon.ico'
        }),
        new WebpackPwaManifest({
            inject: true,
            ios: true,
            name: 'SSR-React',
            short_name: 'SSR',
            description: 'My awesome Progressive Web App!',
            background_color: '#dd5850',
            theme_color: '#dd5850',
            display: 'standalone',
            icons: [
                {
                    src: path.resolve('src/client/app-icon.png'),
                    sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
                    destination: path.join('icons', 'ios'),
                    ios: true
                }
            ]
        }),
        new OfflinePlugin({
            appShell: 'network-first',
            responseStrategy: 'cache-first',
            excludes: ['**/.*', '**/*.map'], // by default '**/*.gz' is excluded
        }),
    ]
};

const server = {
    mode: 'development',
    entry: './src/server/index.js',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dev'),
        filename: 'server.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: 'file-loader?name=./assets/images/[name].[ext]'
            }
        ]
    },
    externals: [nodeExternals()],
    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__: 'false'
        })
    ]
};

module.exports = [client, server];