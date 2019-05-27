const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackChangeAssetsExtensionPlugin = require('html-webpack-change-assets-extension-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const OfflinePlugin = require('offline-plugin');
const path = require('path');
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
                test: /\.(png|ico|svg|jpg|gif)$/,
                use: 'file-loader?name=./assets/images/[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({ __isBrowser__: 'true' }),
        new HtmlWebpackPlugin({
            template: 'src/client/app-shell.html',
            filename: 'app-shell.html',
            favicon: 'src/client/favicon.ico',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            },
            jsExtension: '.gz'
        }),
        new CompressionPlugin({
            deleteOriginalAssets: true,
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$/,
            minRatio: 0.8,
        }),
        new HtmlWebpackChangeAssetsExtensionPlugin(),
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
                    sizes: [96, 128, 192, 256, 384, 512],
                    destination: path.join('icons', 'ios'),
                    ios: true
                }
            ]
        }),
        new OfflinePlugin({
            appShell: '/app-shell.html',
            responseStrategy: 'cache-first',
            excludes: ['**/.*', '**/*.map'], // by default '**/*.gz' is excluded
        }),
        new BundleAnalyzerPlugin({ analyzerMode: 'none' }),
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