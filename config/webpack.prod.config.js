const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.base.config');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const APP_DIR = path.resolve(__dirname, '../src');
const BUILD_DIR = path.resolve(__dirname, '../public');
const gitRevisionPlugin = new GitRevisionPlugin();

module.exports = Object.assign({}, config, {
  devtool: false,
  entry: {
    app: [`${APP_DIR}/index.js`]
  },
  plugins: [
    new HtmlWebpackPlugin({
      gitVersion: gitRevisionPlugin.commithash(),
      template: `${APP_DIR}/index.html`
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    gitRevisionPlugin
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        uglifyOptions: {
          compress: {
            warnings: false,
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
            },
            toplevel: false,
            nameCache: null,
            ie8: false,
            keep_classnames: undefined,
            keep_fnames: false,
            safari10: false
          }
        
      })
    ]
  }
});
