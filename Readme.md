# Wild Circus (Back-End part)

This code is the backend part of the app Wild Circus to close the loop. This app allow you to follow the differents shows of Wild Circus.

You can find the Front-End part [here](https://github.com/Elisecroft/WildCircus-Client).

## How use it

### Where ?

#### Clone this repo

##### `npm install`

You need dependencies to launch this app.

You also need to install [MySQL](https://www.mysql.com/).

##### `node index.js`

Runs the server.  
You can made actions with [Postman](https://www.getpostman.com/) for example at http://localhost:8000

##### Setup a key

Replace key.js.example file by key.js. You can generate a key [here](https://8gwifi.org/sshfunctions.jsp).

### Differents routes

#### `/representations`

##### **GET** `/representations/`

Get all representations.

##### **POST** `/representations/`

Create a representation in database with differents informations in the body (city, date, price, photo).

##### **PUT** `/representations/REPRESENTATION_ID`

Update representation informations.

##### **DELETE** `/representations/REPRESENTATION_ID`

Delete representation from database.

#### /reservations

##### **GET** `/reservations/USER_ID`

Get reservation of the user.

##### **POST** `/reservations/`

Create a reservation in database with differents informations in the body (user_id, representation_id, places).

##### **DELETE** `/reservations/RESERVATION_ID`

Delete reservation from database.

#### /login

##### **POST** `/login/`

Send email and password in body and check if matching user exist in database.

##### **GET** `/login/`

Check if actual token is correct.

#### /users

##### **GET** `/users/USER_ID`

Get user informations.

##### **POST** `/users/`

Create a user in database with differents informations in the body, if the email don't already exist (email, password).

## Built with

[Node.JS](https://nodejs.org/en/) - A JavaScript runtime  
[Express](https://expressjs.com/) - A web framework for Node.js  
[mysql](https://www.npmjs.com/package/mysql) - A sql database  
[JWT](https://www.npmjs.com/package/jsonwebtoken) - A npm package to generate JSON Web Token    

## Author

**Elise Guezel** for the work
