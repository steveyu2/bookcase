const path = require('path');
const loaderUtils = require('loader-utils');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function() {
  return [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
        },
      },
    },
    {
      test: /\.(scss|css)$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
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
          },
        },
        {
          loader: require.resolve('postcss-loader'),
          options: {
            plugins: () => [
              require('postcss-preset-env')({
                autoprefixer: {
                  flexbox: 'no-2009',
                },
                stage: 3,
              }),
            ],
          },
        },
        'sass-loader',
      ],
    },
  ];
};
