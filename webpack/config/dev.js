/**
 * Created by junxie on 18/5/27.
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const appPaths = require('../paths');

console.log('appPaths.appHtml', appPaths.appHtml)

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        'babel-polyfill': ['babel-polyfill'],
        index: [appPaths.appIndexJs]
    },
    output: {
        path: appPaths.build,
        filename: '[name].bundle.js'
    },

    devServer: {
        contentBase: appPaths.appPublic,
        compress: true,
        port: 3434,
    },

    optimization: {
        minimizer: [
            // we specify a custom UglifyJsPlugin here to get source maps in production
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: false,
                    ecma: 6,
                    mangle: true
                },
                sourceMap: true
            })
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: appPaths.appHtml,
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(less|css)$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [path.resolve(__dirname, 'src')],
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            }
        ]
    },
    resolve: {
        // you can now require('file') instead of require('file.coffee')
        alias: { '@app': path.resolve(__dirname, '../../src'), },
        extensions: ['.js', '.jsx']
    },
    stats: { children: false }
};
