const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');
const marked = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];

// //Configuration for Multer
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `img/admin-${file.fieldname}-${Date.now()}.${ext}`);
//   },
// });

// //Calling the "multer" Function
// const upload = multer({
//   storage: multerStorage,
// });

//CREATE A POST
router.post('/', async (req, res) => {
  // console.log(req.body);
  // res.redirect('/dashboard/feeds');
  try {
    const user = await User.findById(req.body.userId);
    if (user.isAdmin) {
      const newPost = new Post(req.body); // tidak ada newPost.files
      // newPost.img = req.file.filename;
      saveCover(newPost, req.body.files);
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
router.post('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      req.body.slug = slugify(req.body.title, { lower: true, strict: true });
      req.body.sanitizeHtml = dompurify.sanitize(marked.parse(req.body.markdown));
      const updatePost = new Post(req.body);
      res.json(updatePost);
      try {
        saveCover(updatePost, req.body.files);
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            title: updatePost.title,
            desc: updatePost.desc,
            markdown: updatePost.markdown,
            categories: updatePost.categories,
            slug: updatePost.slug,
            sanitizeHtml: updatePost.sanitizeHtml,
            img: updatePost.img,
            imgType: updatePost.imgType,
          },
          { new: true }
        );
        res.redirect('/dashboard/feeds');
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json('you can only edit your own post');
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
      res.status(403).json('you can only delete your own post');
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

function saveCover(image, imageEncoded) {
  let imgEnc = imageEncoded;
  if (imgEnc == null) return;
  if (typeof imgEnc === 'string') {
    imgEnc = [imageEncoded];
  }
  for (let i = 0; i < imgEnc.length; i++) {
    const cover = JSON.parse(imgEnc[i]);
    if (cover != null && imageMimeTypes.includes(cover.type)) {
      const buff = new Buffer.from(cover.data, 'base64');
      image.img.push(buff);
      image.imgType.push(cover.type);
      //   image.img = new Buffer.from(cover.data, 'base64');
      //   image.imgType = cover.type;
      // }
      // const cover = imageEncoded.map((e) => {
      //   return JSON.parse(e);
      // });
      // if (cover != null && imageMimeTypes.includes(cover.type)) {
      //   image.img = new Buffer.from(cover.data, 'base64');
      //   image.imgType = cover.type;
      // }
    }
  }
}

module.exports = router;
