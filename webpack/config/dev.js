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
    publicPath: '/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
  },
  devServer: {
    contentBase: appPaths.appBuild,
    compress: true,
    port: 3434,
    hot: true,
    historyApiFallback: {
      // 多个页面的配置
      // rewrites: [
      //   { from: /./, to: appPaths.appHtml },
      //   { from: /^\/book/, to: appPaths.appBookHtml },
      // ],
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          // 抽离第三方插件
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
        },
      },
    },
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
      template: appPaths.appHtml,
      filename: 'index.html',
      hash: true,
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      template: appPaths.appBookHtml,
      filename: 'book.html',
      hash: true,
      chunks: ['book'],
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
    alias: {
      '@app': appPaths.appSrc,
      '@pages': appPaths.appSrc + '/pages',
      '@components': appPaths.appSrc + '/components',
    },
    extensions: ['.js', '.jsx'],
  },
};
