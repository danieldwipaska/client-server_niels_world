const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('knowledge', {
    layout: 'layouts/main-layout',
    title: 'Knowledge',
  });
});

module.exports = router;
