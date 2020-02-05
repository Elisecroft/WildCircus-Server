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

// get with userId
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  // improve this part
  // get id of all reservation of user
  connection.query('SELECT DISTINCT reservation.id FROM reservation INNER JOIN user ON reservation.user_id = ?', [userId], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error when get the reservation');
    } else {
      // then get all infos for each reservation
      if (results.length > 0) {
        const getreservation = new Promise((resolve) => {
          let allInfos = [];
          let indexCount = 0;
          results.map((reserv) => {
            const sendResult = () => {
              // if map is completed => resolve
              if (indexCount === results.length) {
                resolve(allInfos);
              }
            };
            connection.query(`SELECT representation.city,
            representation.date,
            representation.price,
            reservation.places,
            representation.photo
            FROM representation
            INNER JOIN reservation
            ON representation.id = reservation.representation_id
            WHERE reservation.id = '${reserv.id}'`, (error, result) => {
              if (error) {
                console.log(error);
                indexCount += 1;
                sendResult();
                // res.status(500).send('Error when get the informations');
              } else {
                allInfos = [...allInfos, { city: result[0].city, date: result[0].date, price: result[0].price, places: result[0].places, reservation_id: reserv.id, photo: result[0].photo }];
                indexCount += 1;
                sendResult();
              }
            })
          });
        });

        getreservation.then((actualInfos) => {
          res.status(200).send(actualInfos);
        });
      } else {
        res.status(200).send(results);
      }
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
