CREATE DATABASE test;

USE test;

CREATE TABLE employees (
    id VARCHAR(255),
    lastName VARCHAR(255),
    firstName VARCHAR(255),
    dateCreated DATE,
    checkIn TIMESTAMP,
    checkOut TIMESTAMP,
    checkPeriod INT ,
    comment VARCHAR(255),
    department VARCHAR(255)
);