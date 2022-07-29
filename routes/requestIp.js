const RequestIp = require('@supercharge/request-ip');

module.exports = function (req, res, next) {
  req.ip = RequestIp.getClientIp(req);

  next();
};
