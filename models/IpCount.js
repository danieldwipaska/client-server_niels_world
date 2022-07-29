const mongoose = require('mongoose');

const IpSchema = new mongoose.Schema(
  {
    data: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Ip', IpSchema);
