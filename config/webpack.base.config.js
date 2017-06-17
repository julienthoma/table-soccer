const path = require('path');
const webpack = require('webpack');
const BUILD_DIR = path.resolve(__dirname, '../public');
const APP_DIR = path.resolve(__dirname, '../src');

module.exports = {
  entry: {
    app: ['react-hot-loader/patch', `${APP_DIR}/index.js`]
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        include: APP_DIR,
        loaders: [
          'style-loader',
          'css-loader?importLoader=1&modules&localIdentName=[name]__[local]',
          'sass-loader'
        ],
        test: /\.scss$/
      },
      {
        include: APP_DIR,
        loader: 'babel-loader',
        test: /\.js$/
      }
    ]
  },
  plugins: []
};
