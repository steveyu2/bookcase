const path = require('path');
const loaderUtils = require('loader-utils');
const postcssNormalize = require('postcss-normalize');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const DEVELOPMENT = require('../env').NODE_ENV === 'development';

const getStyleLoaders = (options, more) => {
  const loaders = [];

  if (!DEVELOPMENT) {
    loaders.push(MiniCssExtractPlugin.loader);
  } else {
    loaders.push('style-loader');
  }

  return [
    ...loaders,

    {
      loader: 'css-loader',
      options: options,
    },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
          postcssNormalize(),
        ],
      },
    },
    ...(more || []),
  ];
};
module.exports = function () {
  return [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
        },
      },
    },
    {
      test: /\.(png|jpe?g|gif|svg)$/i,
      type: 'asset/resource',
    },
    {
      test: /\.(scss|css)$/,
      use: getStyleLoaders(
        {
          modules: {
            getLocalIdent: (context, localIdentName, localName, options) => {
              const hash = loaderUtils.getHashDigest(
                path.posix.relative(context.rootContext, context.resourcePath) + localName,
                'md5',
                'base64',
                5
              );
              const className = loaderUtils.interpolateName(context, hash, options);
              return [localName, className.replace(/\-|\_/g, '')].join('_');
            },
          },
          sourceMap: DEVELOPMENT,
        },
        [
          {
            loader: 'sass-loader',
          },
        ]
      ),
    },
  ];
};
