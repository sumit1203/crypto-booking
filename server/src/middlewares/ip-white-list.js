const { handleApplicationError } = require('../errors');

const validateIPWhiteList = function (req, res, next) {
  if (process.env.WHITELIST === '*') {
    return next();
  }
  const whiteList = process.env.WHITELIST.split(',');
  let ip = req.ip ||
            req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
  if (ip.substr(0, 7) === '::ffff:') {
    ip = ip.substr(7);
  }
  if (whiteList.indexOf(ip) === -1) {
    return next(handleApplicationError('whiteList'));
  }
  next();
};

module.exports = {
  validateIPWhiteList,
};
