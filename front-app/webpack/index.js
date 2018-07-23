const { resolve } = require('path');

const vendor = require('./vendor');
const rules = require('./rules');
const plugins = require('./plugins');
const devServer = require('./dev-server');
const devtool = require('./devtool');

const settings = {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css', '.scss'],
  },
  context: resolve(__dirname, '..'),
  entry: {
    app: [
      'react-hot-loader/patch',
      'babel-polyfill',
      './src/index'
    ],
    vendor,
  },
  output: {
    filename: '[name].[hash].js',
    path: resolve(__dirname, '..', 'public'),
  },
  module: {
    rules,
  },
  mode: process.env.NODE_ENV,
  plugins,
  devServer,
  devtool,
};

module.exports = settings;


