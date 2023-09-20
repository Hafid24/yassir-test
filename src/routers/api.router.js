const express = require('express');

const apiController = require('../controllers/api.controller');

const router = express.Router();




router.post('/add_employee', apiController.addEmployee);

router.get('/get_employees', apiController.getEmployees);

router.post('/filter_employees', apiController.filterEmplyeesByCreationDate);

router.route('/check_in').put(apiController.checkIn);


router.route('/check_out').put(apiController.checkOut);


module.exports = router;