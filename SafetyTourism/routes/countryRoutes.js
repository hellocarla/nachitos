const express = require('express');
//const { celebrate, Joi } = require('celebrate');
// IMPORT the controller
const countryController = require('../controllers/countryController');
var router = express.Router();

//GET all countries from API OMS
router.get('/', countryController.getCountries);

//Export
module.exports = router;
