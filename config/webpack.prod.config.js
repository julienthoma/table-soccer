const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.base.config');
const APP_DIR = path.resolve(__dirname, '../src');
const BUILD_DIR = path.resolve(__dirname, '../public');

module.exports = Object.assign({}, config, {
  mode: 'production',
  devtool: false,
  entry: {
    app: [`${APP_DIR}/index.js`]
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].js'
  },
  plugins: config.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  ])
});
