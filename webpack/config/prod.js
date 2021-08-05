const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCss = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const appPaths = require('../paths');
const appEnv = require('../env');
const getLoader = require('./getLoader');

module.exports = {
  devtool: 'none', // source-map none
  mode: 'production',
  entry: {
    index: appPaths.appIndexJs,
    book: appPaths.appBookJs,
    // vendors: ['react', 'react-dom',],
  },
  output: {
    path: appPaths.appBuild,
    publicPath: '/',
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: 'js/[name].[contenthash:8].chunk.js',
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
      template: appPaths.appHtml,
      filename: 'index.html',
      hash: true,
      chunks: ['index', 'vendor'],
    }),
    new HtmlWebpackPlugin({
      template: appPaths.appBookHtml,
      filename: 'book.html',
      hash: true,
      chunks: ['book', 'vendor'],
    }),
    new MiniCssExtractPlugin({
      ignoreOrder: true,
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    new CopyPlugin(
      [
        {
          from: appPaths.appPublic,
          to: appPaths.appBuild,
        },
      ],
      new webpack.DefinePlugin(appEnv)
    ),
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
  stats: { children: false },
};
