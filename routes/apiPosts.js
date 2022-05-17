const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');
const multer = require('multer');
const marked = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

//Configuration for Multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `img/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});

//Calling the "multer" Function
const upload = multer({
  storage: multerStorage,
});

//CREATE A POST
router.post('/', upload.single('files'), async (req, res) => {
  // console.log(req.body);
  // res.redirect('/dashboard/feeds');
  try {
    const user = await User.findById(req.body.userId);
    if (user.isAdmin) {
      const newPost = new Post(req.body);
      newPost.img = req.file.filename;
      try {
        const savedPost = await newPost.save();
        // res.json(savedPost);
        res.redirect('/dashboard/feeds');
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

//UPDATE A POST
// it should be a PUT
router.post('/:id', upload.single('files'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      try {
        req.body.slug = slugify(req.body.title, { lower: true, strict: true });
        req.body.sanitizeHtml = dompurify.sanitize(marked.parse(req.body.markdown));
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            title: req.body.title,
            desc: req.body.desc,
            markdown: req.body.markdown,
            categories: req.body.categories,
            slug: req.body.slug,
            sanitizeHtml: req.body.sanitizeHtml,
            img: req.file.filename,
          },
          { new: true }
        );
        res.redirect('/dashboard/feeds');
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status.apply(403).json('you can only edit your own post');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE A POST
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      try {
        await Post.findByIdAndDelete(req.params.id);
        res.json('the post has been deleted');
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status.apply(403).json('you can only delete your own post');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET A POST
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POST
router.get('/', async (req, res) => {
  try {
    const post = await Post.find();
    res.json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER POSTS
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find({ username: req.query.userId });
    req.json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
