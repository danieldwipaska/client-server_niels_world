const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//REGISTER
router.post('/register', async (req, res) => {
  try {
    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    const user = await newUser.save();
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post('/login', async (req, res) => {
  try {
    // Find the data by username
    const validUser = await User.findOne({ username: req.body.username });
    if (!validUser) return res.status(400).json('wrong username or password');

    // Check whether password is correct or not
    const validPass = await bcrypt.compare(req.body.password, validUser.password);
    if (!validPass) return res.status(400).json('wrong username or password');

    // Create and assign a token
    const token = jwt.sign({ name: validUser.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
    // console.log(token);
    let options = {
      path: '/',
      sameSite: true,
      maxAge: 1000 * 60 * 60 * 24, // would expire after 24 hours
      httpOnly: true, // The cookie only accessible by the web server
    };

    res.cookie('x-access-token', token, options);
    res.redirect('/dashboard/feeds');
    // // Send response containing user data without password
    // const { password, ...others } = validUser._doc;
    // res.json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGOUT
router.get('/logout', (req, res) => {
  res.cookie('x-access-token', '', { maxAge: 1 });
  res.redirect('/');
});

//RENDER LOGIN PAGE
router.get('/login', (req, res) => {
  res.render('login', {
    layout: 'layouts/main-layout',
    title: 'Login',
  });
});

module.exports = router;
