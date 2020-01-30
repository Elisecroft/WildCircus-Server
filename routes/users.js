const express = require('express');
const connection = require('../conf');
const router = express.Router();
const sha256 = require('sha256');

// create an user
router.post('/', (req, res) => {
  const { email, password } = req.body; // users infos sent
  if (!email || !password) {
    res.status(400).json('missing fields');
  } else {
    connection.query(`SELECT email FROM user WHERE email = '${email}'`, (err, rows, fields) => {
      if (err) {
        res.sendStatus(400);
        throw err;
      } else {
        if (rows.length > 0) {
          res.status(400).send('Email already use');
        } else {
          data = { email, password: sha256(password), isAdmin: false };
          connection.query('INSERT INTO user SET ?', data, (error, result) => {
            if (error) {
              console.log(error);
              res.status(500).send('Error when saving user');
            } else {
              connection.query('SELECT * FROM user WHERE id = ?', [result.insertId], (subErr, subResult) => {
                if (subErr) {
                  console.log(subErr);
                } else {
                  res.status(201).send(subResult);
                }
              });
            }
          });
        }
      }
    })
  }
});

// get user by id
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  connection.query('SELECT * FROM user WHERE id = ?', [userId], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = router;
