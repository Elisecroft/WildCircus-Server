const express = require('express');
const connection = require('../conf');
const router = express.Router();

// post
router.post('/', (req, res) => {
  const { city, date, availablePlaces, price, photo, coordinates } = req.body; // representation infos sent
  if (!city || !date || !availablePlaces || !price) {
    res.status(400).json('missing fields');
  } else {
    data = { city, date, availablePlaces, price, photo, coordinates };
    connection.query('INSERT INTO representation SET ?', data, (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error when saving representation');
      } else {
        connection.query('SELECT * FROM representation WHERE id = ?', [result.insertId], (subErr, subResult) => {
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

router.get('/', (req, res) => {
  connection.query('SELECT * FROM representation', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(result);
    }
  });
});

// get
// router.get('/:representationId', (req, res) => {
//   const representationId = req.params.representationId;
//   connection.query('SELECT * FROM representation WHERE id = ?', [representationId], (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.status(200).send(result);
//     }
//   });
// });

// put
router.put('/:representationId', (req, res) => {
  const representationId = req.params.representationId;
  const data = req.body; // representation infos sent
  connection.query('UPDATE representation SET ? WHERE id = ?', [data, representationId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error when update representation');
    } else {
      connection.query('SELECT * FROM representation WHERE id = ?', [representationId], (err, result) => {
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
router.delete('/:representationId', (req, res) => {
  const representationId = req.params.representationId;
  connection.query('DELETE FROM representation WHERE id = ?', [representationId], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send('Representation delete');
    }
  });
});

module.exports = router;
