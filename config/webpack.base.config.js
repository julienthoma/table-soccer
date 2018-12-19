const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, '../public');
const APP_DIR = path.resolve(__dirname, '../src');

module.exports = {
  entry: {
    app: ['react-hot-loader/patch', `${APP_DIR}/index.js`]
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Table Soccer',
      favicon: `${BUILD_DIR}/favicon.png`,
      hash: true,
      template: `${APP_DIR}/index.html`
    })
  ],
  module: {
    rules: [
      {
        include: APP_DIR,
        exclude: [/node_modules/],
        loaders: [
          'style-loader',
          'css-loader?importLoader=1&modules&localIdentName=[name]__[local]',
          'sass-loader'
        ],
        test: /\.scss$/
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        include: APP_DIR,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        test: /\.js$/
      }
    ]
  }
};
