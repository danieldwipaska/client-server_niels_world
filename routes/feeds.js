const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Category = require('../models/Category');
const Comment = require('../models/Comment');

//GET ALL FEEDS BY CATEGORY
router.get('/', async (req, res) => {
  const catSlug = req.query.category;
  try {
    const cats = await Category.find().sort({ name: 1 });
    let posts;
    if (catSlug) {
      const category = await Category.find({ slug: catSlug });
      posts = await Post.find({
        categories: {
          $in: [category[0].name],
        },
      });
      posts.forEach((post) => {
        const dateCreated = new Date(post.createdAt);
        post.dateCreated = dateCreated;
      });
      res.render('feeds', {
        layout: 'layouts/main-layout',
        post: posts,
        cat: cats,
        title: 'Feeds',
        category: category[0].name,
      });
    } else {
      posts = await Post.find().sort({ createdAt: -1 });
      posts.forEach((post) => {
        const dateCreated = new Date(post.createdAt);
        post.dateCreated = dateCreated;
      });
      res.render('feeds', {
        layout: 'layouts/main-layout',
        post: posts,
        cat: cats,
        title: 'Feeds',
        category: 'Semua Kategori',
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET A FEED
router.get('/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    const comments = await Comment.find({ postSlug: req.params.slug }).sort({ createdAt: 1 });
    res.render('feedsView', {
      layout: 'layouts/main-layout',
      ipAddress: req.ip,
      post: post,
      title: post.title,
      comments: comments, //array
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
