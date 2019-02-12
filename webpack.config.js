const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __isBrowser__: 'true'
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'template.html'
        })
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