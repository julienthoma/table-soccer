const dev= require('./config/webpack.dev.config');
const prod = require('./config/webpack.prod.config');

module.exports = process.env.NODE_ENV === 'production' ? prod : dev;
