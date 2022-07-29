const RequestIp = require('@supercharge/request-ip');
const IpData = require('../models/IpCount');

module.exports = async function (req, res, next) {
  const ipAddr = RequestIp.getClientIp(req);

  try {
    const ipData = await IpData.findOne({ data: ipAddr });
    if (ipData === undefined || ipData === null) {
      try {
        const newIpData = new IpData({ data: ipAddr });
        await newIpData.save();
      } catch (err) {
        res.status(500).json(err);
      }
    }
    next();
  } catch (err) {
    res.status(404).json(err);
  }
};
