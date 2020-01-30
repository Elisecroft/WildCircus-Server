const express = require('express');
const sha512 = require('js-sha512');
const jwt = require('jsonwebtoken');
const key = require('../key');
const checkToken = require ('../middlewares/checkToken');
const router = express.Router();

// Login
router.post('/', (req, res) => {
  const { email, password } = req.body;
  const user = { name: email, exp: Date.now() + (24 * 60 * 60) }; // properties's token
  const accessToken = jwt.sign(user, key); // create token with properties

  // search user
  connection.query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result.length > 0) {
        res.status(200).send({ accessToken, result: result[0] });
      } else {
        res.status(404).send('Email or password are wrong');
      }
    }
  });
});

// check token
router.get('/', checkToken, (req, res) => {

  // search user
  connection.query('SELECT * FROM user WHERE email = ?', [req.userEmail], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result.length > 0) {
        res.status(200).send(result[0]);
      } else {
        res.status(404).send('Not found');
      }
    }
  });
});

module.exports = router;
