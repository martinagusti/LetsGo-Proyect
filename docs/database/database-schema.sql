CREATE DATABASE IF NOT EXISTS db_viajes2;
USE db_viajes2;

DROP TABLE IF EXISTS comentaries;
DROP TABLE IF EXISTS trips;
DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS favourites;
DROP TABLE IF EXISTS users;


CREATE TABLE users(
ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
lastName VARCHAR(100) NOT NULL,
userName VARCHAR(100) UNIQUE NOT NULL,
email VARCHAR(200) NOT NULL,
password VARCHAR(128) NOT NULL,
createAt DATETIME NULL DEFAULT NULL,
role ENUM("admin","user") NULL DEFAULT "user",
image VARCHAR(100) NULL DEFAULT NULL,
verificationCode VARCHAR(100) NULL DEFAULT NULL,
bio TEXT NULL DEFAULT NULL
);

CREATE TABLE trips(
ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
IdUser INT UNSIGNED NOT NULL,
title VARCHAR(255) NOT NULL,
createAt DATETIME NULL DEFAULT NULL,
dateExperience DATETIME NULL DEFAULT NULL,
category ENUM("viaje-familiar","viaje-negocios","viaje-cultural","viaje-gastronomico","viaje-diversion","viaje-playero","viaje-rural","viaje-naturaleza","viaje-low-cost") NOT NULL,
city VARCHAR(200) NOT NULL,
excerpt VARCHAR(300) NOT NULL,
description TEXT NULL DEFAULT NULL,
image VARCHAR(100) NULL DEFAULT NULL,
FOREIGN KEY(IdUser) REFERENCES users(id)
ON DELETE CASCADE
);

CREATE TABLE comentaries(
ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
IdUser INT UNSIGNED NOT NULL,
IdTrip INT UNSIGNED NOT NULL,
comentaries TEXT NOT NULL,
FOREIGN KEY(IdUser) REFERENCES users(id)
ON DELETE CASCADE,
FOREIGN KEY(IdTrip) REFERENCES trips(id)
ON DELETE CASCADE
);

CREATE TABLE votes (
ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
IdUser INT UNSIGNED NOT NULL,
IdTrip INT UNSIGNED NOT NULL,
FOREIGN KEY(IdUser) REFERENCES users(id)
ON DELETE CASCADE,
FOREIGN KEY(IdTrip) REFERENCES trips(id)
ON DELETE CASCADE
);

CREATE TABLE favourites (
ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
IdUser INT UNSIGNED NOT NULL,
IdTrip INT UNSIGNED NOT NULL,
FOREIGN KEY(IdUser) REFERENCES users(id)
ON DELETE CASCADE,
FOREIGN KEY(IdTrip) REFERENCES trips(id)
ON DELETE CASCADE
);