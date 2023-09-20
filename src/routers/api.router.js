const express = require('express');

const apiController = require('../controllers/api.controller');

const router = express.Router();



// Endpoint for getting all the records
router.post('/add_employee', apiController.addEmployee);


// Endpoint for getting all the records
router.get('/get_employees', apiController.getEmployees);


// Endpoint for creating a new record
router.post('/filter_employees', apiController.filterEmplyeesByCreationDate);

// Endpoint for creating a new record
router.route('/check_in').put(apiController.checkIn);


// Endpoint for creating a new record
router.route('/check_out').put(apiController.checkOut);

// Endpoints for updating/deleting a record

module.exports = router;