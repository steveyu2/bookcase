const fs = require('fs');
const paths = require('./paths');

const NODE_ENV = process.env.NODE_ENV || 'development';

const dotenvFiles = [
  `${paths.dotenv}.${NODE_ENV}.local`,
  `${paths.dotenv}.${NODE_ENV}`,
  paths.dotenv,
].filter(Boolean);

dotenvFiles.forEach((dotenvFile) => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv-expand')(
      require('dotenv').config({
        path: dotenvFile,
      })
    );
  }
});

const REACT_APP = /^REACT_APP_/i;

process.env.PUBLIC_URL = paths.appPublic;

const ENV = {
  REACT_APP_TITLE: 'book case',
  NODE_ENV: process.env.NODE_ENV || 'development',
  PUBLIC_URL: paths.appPublic,
  ...Object.keys(process.env)
    .filter((key) => REACT_APP.test(key))
    .reduce((env, key) => {
      env[key] = process.env[key];
      return env;
    }, {}),
};

module.exports = {
  origin: ENV,
  format: {
    'process.env': Object.keys(ENV).reduce((env, key) => {
      env[key] = JSON.stringify(ENV[key]);
      return env;
    }, {}),
  },
};
