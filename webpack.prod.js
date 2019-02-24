const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const OfflinePlugin = require('offline-plugin');
const webpack = require('webpack');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const client = {
    mode: 'production',
    entry: './src/client/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].bundle.js',
        chunkFilename: '[name].[hash].bundle.js',
        publicPath: '/'
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: {
            name: entrypoint => `runtime~${entrypoint.name}`
        }
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
    plugins: [
        new BundleAnalyzerPlugin({ analyzerMode: 'none' }),
        new webpack.DefinePlugin({ __isBrowser__: 'true' }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'template.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new OfflinePlugin(),
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
                    src: path.resolve('src/assets/icon.png'),
                    sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
                    destination: path.join('icons', 'ios'),
                    ios: true
                }
            ]
        })
    ]
};

const server = {
    mode: 'production',
    entry: './src/server/index.js',
    target: 'node',
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'dist'),
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
    plugins: [
        new webpack.DefinePlugin({ __isBrowser__: 'false' })
    ]
};

module.exports = [client, server];