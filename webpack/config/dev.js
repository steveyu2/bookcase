const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const appPaths = require('../paths');
const getLoader = require('./getLoader');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    index: [appPaths.appIndexJs, appPaths.appBookJs],
  },
  output: {
    path: appPaths.appBuild,
    filename: '[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
  },
  devServer: {
    contentBase: appPaths.appPublic,
    compress: true,
    port: 3434,
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
      template: [appPaths.appHtml, appPaths.appBookHtml],
    }),
    new MiniCssExtractPlugin({
      ignoreOrder: true,
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].css',
    }),
  ],
  module: {
    rules: [...getLoader()],
  },
  resolve: {
    alias: { '@app': appPaths.appSrc },
    extensions: ['.js', '.jsx'],
  },
};
