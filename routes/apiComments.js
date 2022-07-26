const router = require('express').Router();
const Comment = require('../models/Comment');

//CREATE A COMMENT
router.post('/', async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();
    res.redirect(`/feeds/${savedComment.postSlug}`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
