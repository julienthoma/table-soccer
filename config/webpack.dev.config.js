const config = require('./webpack.base.config');

config.devtool = 'eval-source-map';
config.devServer = {
  hot: true,
  contentBase: './public'
};

module.exports = config;
