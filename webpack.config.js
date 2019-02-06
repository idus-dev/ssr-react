const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: [
        '@babel/polyfill',
        './src/client/index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'client.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __isBrowser__: 'true'
        })
    ]
};