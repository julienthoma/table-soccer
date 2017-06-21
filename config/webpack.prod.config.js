const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.base.config');
const APP_DIR = path.resolve(__dirname, '../src');
const BUILD_DIR = path.resolve(__dirname, '../public');

module.exports = Object.assign({}, config, {
  devtool: false,
  entry: {
    app: [`${APP_DIR}/index.js`]
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].min.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
      }
    })
  ]
});
