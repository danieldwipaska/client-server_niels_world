const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  let token = req.cookies['x-access-token'];

  if (!token)
    return res.render('login', {
      layout: 'layouts/main-layout',
      title: 'Login',
    }); // if there is no token

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res.render('login', {
        layout: 'layouts/main-layout',
        title: 'Login',
      });
    req.validUser = user;
    next();
  });
};
