const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      max: 100,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
      max: 500,
    },
    img: {
      type: Buffer,
      default: '',
    },
    imgType: {
      type: String,
      default: '',
    },
    categories: {
      type: Array,
      default: [],
    },
    markdown: {
      type: String,
      required: true,
      max: 3000,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    sanitizeHtml: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

PostSchema.pre('validate', function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  if (this.markdown) {
    this.sanitizeHtml = dompurify.sanitize(marked.parse(this.markdown));
  }
  next();
});

PostSchema.virtual('imgPath').get(function () {
  if (this.img != null && this.imgType != null) {
    return `data:${this.imgType};charset=utf-8;base64,${this.img.toString('base64')}`;
  }
});

module.exports = mongoose.model('Post', PostSchema);
