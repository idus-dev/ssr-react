const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'dev'),
        port: 3000,
        host: `localhost`
    },
    entry: {
        app: ['./src/client/index.js']
    },
    output: {
        path: path.join(__dirname, 'dev'),
        filename: 'client.js',
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
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './assets/images/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {}
    },
    plugins: [
        new webpack.DefinePlugin({ 'process.env.IS_BROWSER': 'true' }),
        new Dotenv({
            path: path.resolve(process.cwd(), '.env.local')
        }),
        new HtmlWebpackPlugin({
            template: 'src/client/app-shell.html',
            filename: 'app-shell.html',
            favicon: './public/favicon.ico'
        })
    ]
};
