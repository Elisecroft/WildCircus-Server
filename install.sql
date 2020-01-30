
DROP DATABASE IF EXISTS wildcircus;
CREATE DATABASE IF NOT EXISTS wildcircus;
USE wildcircus;

DROP TABLE IF EXISTS user, reservation, representation;

CREATE TABLE user (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(128) NOT NULL UNIQUE,
  password VARCHAR(128) NOT NULL,
  isAdmin BOOLEAN NOT NULL
);

CREATE TABLE representation (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  city VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  price FLOAT NOT NULL,
  photo TEXT,
  coordinates VARCHAR(255)
);

CREATE TABLE reservation (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id)
    REFERENCES user(id)
    ON DELETE CASCADE,
  representation_id INT NOT NULL,
  FOREIGN KEY (representation_id)
    REFERENCES representation(id)
    ON DELETE CASCADE,
  places INT NOT NULL
);
