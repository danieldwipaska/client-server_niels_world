const router = require('express').Router();
const Category = require('../models/Category');
const User = require('../models/User');

// create a category
router.post('/', async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (user.isAdmin) {
      const newCat = new Category(req.body);
      try {
        const savedCat = await newCat.save();
        res.redirect('/dashboard/feeds/category');
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json('you are not an admin!');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all categories
router.get('/', async (req, res) => {
  try {
    const cats = await Category.find().sort({ name: 1 });
    res.json(cats);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get category (query)

module.exports = router;
