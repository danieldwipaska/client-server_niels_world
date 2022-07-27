const router = require('express').Router();
const Comment = require('../models/Comment');

//CREATE A COMMENT
router.post('/', async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();

    const teleSend = await fetch(`https://api.telegram.org/bot${process.env.TELE_TOKEN}/sendMessage?chat_id=@NielsWorld_bot&text=Ada+Komentar+Masuk`);

    res.redirect(`/feeds/${savedComment.postSlug}`);
  } catch (err) {
    res.status(500).json(err);
  }
});

//TELEGRAM BOT

module.exports = router;
