const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
// const verify = require('./verifyToken');
const verify2 = require('./verifyTokenForNav');

//UPDATE
router.put('/:id', async (req, res) => {
  // Check whether user has logined or not
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    // if client send request containing password
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    // Update user data depending on request
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body, // update according to all within req.body
        },
        { new: true }
      );
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json('You can update only yout account!');
  }
});

//GET USER
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//FOR NAV
router.get('/', verify2, async (req, res) => {
  res.json({ username: req.validUser.name });
  // console.log('req.validUser.name');
  // res.json({ username: req.validUser.name });
});

// //GET ALL USER
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find();
//     const result = [];
//     users.forEach((e) => {
//       const { password, ...others } = e._doc;
//       result.push(others);
//     });
//     res.json(result);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
