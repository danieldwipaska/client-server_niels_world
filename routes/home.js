const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const ipAddress = require('./requestIp');

router.get('/', ipAddress, async (req, res) => {
  try {
    const post = await Post.find().sort({ createdAt: -1 });
    const posts = post.slice(0, 4);
    posts.forEach((e) => {
      const dateCreated = new Date(e.createdAt);
      e.dateCreated = dateCreated;
    });
    res.render('index', {
      layout: 'layouts/main-layout',
      post: posts,
      title: 'Home',
      ipAddress: req.ip,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/about', (req, res) => {
  res.render('about', {
    layout: 'layouts/main-layout',
    title: 'About me',
  });
});

module.exports = router;
