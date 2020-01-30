const express = require('express');
const connection = require('../conf');
const router = express.Router();

// post
router.post('/', (req, res) => {
  const { user_id, representation_id, places } = req.body; // reservation infos sent
  if (!user_id || !representation_id || !places) {
    res.status(400).json('missing fields');
  } else {
    data = { user_id, representation_id, places };
    connection.query('INSERT INTO reservation SET ?', data, (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error when saving reservation');
      } else {
        connection.query('SELECT * FROM reservation WHERE id = ?', [result.insertId], (subErr, subResult) => {
          if (subErr) {
            console.log(subErr);
          } else {
            res.status(201).send(subResult);
          }
        });
      }
    })
  }
});

// get
router.get('/:reservationId', (req, res) => {
  const reservationId = req.params.reservationId;
  connection.query('SELECT * FROM reservation WHERE id = ?', [reservationId], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(result);
    }
  });
});

// put
router.put('/:reservationId', (req, res) => {
  const reservationId = req.params.reservationId;
  const data = req.body; // reservation infos sent
  connection.query('UPDATE reservation SET ? WHERE id = ?', [data, reservationId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error when update reservation');
    } else {
      connection.query('SELECT * FROM reservation WHERE id = ?', [reservationId], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(result);
        }
      });
    }
  });
});

// delete
router.delete('/:reservationId', (req, res) => {
  const reservationId = req.params.reservationId;
  connection.query('DELETE FROM reservation WHERE id = ?', [reservationId], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send('Reservation delete');
    }
  });
});

module.exports = router;
