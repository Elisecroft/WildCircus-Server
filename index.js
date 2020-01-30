
const port = 8000;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const users = require('./routes/users');
const representations = require('./routes/representations');
const reservations = require('./routes/reservations');
const login = require('./routes/login');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', users);
app.use('/representations', representations);
app.use('/reservations', reservations);
app.use('/login', login);

app.listen(port, (err) => {
  if (err) {
      throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on http://localhost:${port}`);
});
