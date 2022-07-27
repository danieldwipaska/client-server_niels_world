const router = require('express').Router();
const Comment = require('../models/Comment');

//TELEGRAM BOT
const telegramBot = require('node-telegram-bot-api');
const bot = new telegramBot(process.env.TELE_TOKEN, { polling: true });

//CREATE A COMMENT
router.post('/', async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();

    //TELEGRAM BOT
    bot.sendMessage(savedComment.fullname);
    res.redirect(`/feeds/${savedComment.postSlug}`);
  } catch (err) {
    res.status(500).json(err);
  }
});

//TELEGRAM BOT

module.exports = router;
