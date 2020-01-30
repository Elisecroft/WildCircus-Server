const jwt = require('jsonwebtoken');
const key = require('../key');

// check if token is correct
const verificationToken = (req, res, next) => {
  if (typeof req.headers.authorization !== 'undefined') {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, key, (err, user) => {
      if (err) {
        res.status(403).send('Unauthorized');
      }
      req.userEmail = user.name;
      return next();
    });
  } else {
    res.status(403).send('Unauthorized');
  }
};

module.exports = verificationToken;
