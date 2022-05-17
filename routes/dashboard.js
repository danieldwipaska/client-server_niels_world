const express = require('express');
const { redirect } = require('express/lib/response');
const router = express.Router();
const Post = require('../models/Post');
const Category = require('../models/Category');
const verify = require('./verifyToken');

// GET USER POSTS
router.get('/feeds', verify, async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    posts.forEach((e) => {
      const dateCreated = new Date(e.createdAt);
      e.dateCreated = dateCreated;
    });
    res.render('dashboardFeeds', {
      layout: 'layouts/main-layout',
      post: posts,
      title: 'Dashboard',
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ADD FORM DATA PAGE
router.get('/feeds/add', verify, async (req, res) => {
  try {
    const cats = await Category.find().sort({ name: 1 });
    res.render('dashboardFeedsAdd', {
      layout: 'layouts/main-layout',
      cat: cats,
      title: 'Add a post',
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// EDIT FORM DATA PAGE
router.get('/feeds/:slug/edit', verify, async (req, res) => {
  try {
    const post = await Post.find({ slug: req.params.slug });
    const cats = await Category.find().sort({ name: 1 });
    res.render('dashboardFeedsEdit', {
      layout: 'layouts/main-layout',
      post: post[0],
      cat: cats,
      title: 'Edit a feed',
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
