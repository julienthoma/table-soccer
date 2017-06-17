const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.base.config');
const APP_DIR = path.resolve(__dirname, '../src');

config.entry.app = [`${APP_DIR}/index.js`],
config.devtool = false;
config.plugins.push(
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify('production') }
  })
);
config.plugins.push(
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  })
);
config.plugins.push(
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
);

module.exports = config;
