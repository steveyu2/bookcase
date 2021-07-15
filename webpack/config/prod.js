const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCss = require('optimize-css-assets-webpack-plugin');

const appPaths = require('../paths');
const getLoader = require('./getLoader');

module.exports = {
  mode: 'production',
  entry: {
    index: appPaths.appIndexJs,
    book: appPaths.appBookJs,
    vendors: ['react'],
  },
  output: {
    path: appPaths.appBuild,
    filename: '[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 20,
      maxAsyncRequests: 20,
      minSize: 40,
    },
    minimizer: [
      // 压缩css
      new OptimizeCss(),
      // 压缩js
      new UglifyJsPlugin({
        // 启用文件缓存
        cache: true,
        // 使用多线程提高构建速度
        parallel: true,
        // 使用sourcemap
        sourceMap: true,
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: appPaths.appHtml,
      chunks: ['index', 'vendors'],
    }),
    new HtmlWebpackPlugin({
      filename: appPaths.appBookHtml,
      chunks: ['book', 'vendors'],
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
