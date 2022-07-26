const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      max: 50,
    },
    postId: {
      type: String,
      required: true,
    },
    postSlug: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
      max: 500,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', CommentSchema);
