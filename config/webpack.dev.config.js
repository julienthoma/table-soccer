const path = require('path');
const config = require('./webpack.base.config');
const BUILD_DIR = path.resolve(__dirname, '../public');

module.exports = Object.assign({}, config, {
  devtool: false,
  devServer: {
    hot: true,
    contentBase: BUILD_DIR,
    filename: 'app.js',
    proxy: {
      '/**': {
        // catch all requests
        target: '/index-dev.html', // default target
        secure: false,
        bypass(req, res, opt) {
          // your custom code to check for any exceptions
          // console.log('bypass check', {req: req, res:res, opt: opt});
          if (
            req.path.indexOf('/img/') !== -1
            || req.path.indexOf('/public/') !== -1
          ) {
            return '/';
          }

          return '/index.html';
        }
      }
    }
  }
});

module.exports = config;
