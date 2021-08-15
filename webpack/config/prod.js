const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCss = require('optimize-css-assets-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');

const appEnv = require('../env');
const appPaths = require('../paths');
const getLoader = require('./getLoader');

module.exports = {
  mode: 'production',
  // devtool: 'source-map',
  entry: {
    index: appPaths.appIndexJs,
    book: appPaths.appBookJs,
    vendors: ['react'],
  },
  output: {
    path: appPaths.appBuild,
    filename: '[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
    publicPath: '/',
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
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].css',
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
    },
    extensions: ['.js', '.jsx', '.scss'],
  },
};
