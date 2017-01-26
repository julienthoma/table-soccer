const path = require('path');
const webpack = require('webpack');
const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, 'src');

module.exports = {
  entry: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server',
      APP_DIR + '/index.js'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        exclude: ['node_modules'],
        loaders: ['react-hot', 'babel']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
    contentBase: '.'
  }
}
