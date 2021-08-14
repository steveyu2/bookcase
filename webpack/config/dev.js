const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');

const appEnv = require('../env');
const appPaths = require('../paths');
const getLoader = require('./getLoader');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    index: appPaths.appIndexJs,
    book: appPaths.appBookJs,
    vendors: ['react'],
  },
  output: {
    filename: '[name].js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: '/',
  },
  devServer: {
    port: 3434,
    writeToDisk: false,
    contentBase: appPaths.appPublic,
    watchContentBase: true,
    historyApiFallback: {
      disableDotRule: true,
      rewrites: [{ from: /^\/book/, to: '/book.html' }],
    },
    // proxy: {
    //   '/api': 'http://localhost:3000',
    // },
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true,
        },
        sourceMap: true,
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: appPaths.appHtml,
      chunks: ['index', 'vendors'],
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: appPaths.appBookHtml,
      chunks: ['book', 'vendors'],
      filename: 'book.html',
    }),
    new MiniCssExtractPlugin({
      ignoreOrder: true,
      filename: 'static/css/[name].css',
      chunkFilename: 'static/css/[name].css',
    }),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, appEnv.origin),
    new webpack.DefinePlugin(appEnv.format),
  ],
  module: {
    rules: [...getLoader()],
  },
  resolve: {
    alias: {
      '@app': appPaths.appSrc,
      '@pages': appPaths.appSrc + '/pages',
      '@components': appPaths.appSrc + '/components',
      '@common': appPaths.appSrc + '/common',
      '@style': appPaths.appSrc + '/style',
    },
    extensions: ['.js', '.jsx'],
  },
  stats: { children: true },
};
