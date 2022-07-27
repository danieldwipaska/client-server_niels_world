const express = require('express');
const app = express();
const Comment = require('./models/Comment');

//TELEGRAM BOT
const telegramBot = require('node-telegram-bot-api');
const bot = new telegramBot(process.env.TELE_TOKEN, { polling: true });

const homeRoute = require('./routes/home');
// const infoRoute = require('./routes/info');
const feedRoute = require('./routes/feeds');
const knowRoute = require('./routes/knowledge');
const dashRoute = require('./routes/dashboard');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');

// import router
const authRoute = require('./routes/apiAuth');
const userRoute = require('./routes/apiUsers');
const postRoute = require('./routes/apiPosts');
const categoryRoute = require('./routes/apiCategories');
const commentRoute = require('./routes/apiComments');

// middlewares
app.use(expressLayouts);
app.use(express.json({ limit: '10mb' }));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ limit: '10mb', extended: false }));
app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(`${__dirname}/public`)); // make files able to access
app.use('/public', express.static(path.join(__dirname, 'public')));

// Mongodb Connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log('connected to DB!'))
  .catch((err) => {
    console.log(err);
  });

// routes
app.use('/', homeRoute);
app.use('/knowledge', knowRoute);
// app.use('/information', infoRoute);
app.use('/feeds', feedRoute);
app.use('/dashboard', dashRoute);

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/comments', commentRoute);
app.get('*', function (req, res) {
  res.sendStatus(404);
});

//TELEGRAM BOT
bot.on('message', (message) => {
  // if (message.text === process.env.TELE_MESSAGE) {
  // const comments = await Comment.find().sort({ createdAt: -1 });
  const msg = message.from.id;
  // comments.forEach((e) => {
  bot.sendMessage(msg, 'testing');
  // });
  // } else {
  // bot.sendMessage(msg, 'Coba kata kunci lain');
  // }
});

// listen at 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
