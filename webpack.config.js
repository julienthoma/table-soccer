const path = require('path');
const webpack = require('webpack');
const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, 'src');

module.exports = {
  devtool: 'source-map',
  entry: [`${APP_DIR}/index.js`],
  output: {
    path: BUILD_DIR,
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        include: APP_DIR,
        loaders: [
          'style-loader',
          'css-loader?importLoader=1&modules&localIdentName=[name]__[local]___[hash:base64:5]',
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
  devServer: {
    hot: true,
    contentBase: '.'
  }
};
