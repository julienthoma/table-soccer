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
    }),
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
        include: APP_DIR,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        test: /\.js$/
      }
    ]
  },
  devServer: {
    hot: true,
    contentBase: BUILD_DIR,
    filename: 'app.js',
    proxy: {
      '/**': {
        // catch all requests
        target: '/index.html', // default target
        secure: false,
        bypass(req, res, opt) {
          // your custom code to check for any exceptions
          // console.log('bypass check', {req: req, res:res, opt: opt});
          if (
            req.path.indexOf('/img/') !== -1 ||
            req.path.indexOf('/public/') !== -1
          ) {
            return '/';
          }

          return '/index.html';
        }
      }
    }
  }
};
