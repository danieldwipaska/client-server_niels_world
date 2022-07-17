const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Category = require('../models/Category');

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
    } else {
      posts = await Post.find().sort({ createdAt: -1 });
    }
    posts.forEach((post) => {
      const dateCreated = new Date(post.createdAt);
      post.dateCreated = dateCreated;
    });
    res.render('feeds', {
      layout: 'layouts/main-layout',
      post: posts,
      cat: cats,
      title: 'Feeds',
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const post = await Post.find({ slug: req.params.slug });
    res.render('feedsView', {
      layout: 'layouts/main-layout',
      post: post[0],
      title: post[0].title,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
