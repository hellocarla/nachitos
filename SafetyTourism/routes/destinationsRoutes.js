// here we add pointers to functions that are called through the controller

// IMPORT requirements
const express = require('express');
const { celebrate, Joi } = require('celebrate');
const destinationsController = require('../controllers/destinationsController');
var router = express.Router();
const admin_funcionarioTokenValidation = require('../middleware/Auth_admin_func');
const adminTokenValidation = require('../middleware/Auth_admin');
const TokenValidation = require('../middleware/Auth_geral');



// Ligação à API OMS
var APIligacao = require('node-rest-client').Client;
var APIaddress = "http://localhost:8080/api/paises";

// POST WITH JOI (YAY)
router.post('/', celebrate({
            body: Joi.object({
                //city_name: Joi.string().required().regex(/^[a-zA-Z]+( [a-zA-Z]+)*$/),
                city_name: Joi.string().required().regex(/^[a-zA-ZÀ-ÖØ-öø-ÿÇç\s]+$/),
                city_desc: Joi.string().min(5).max(280).regex(/^[a-zA-ZÀ-ÖØ-öø-ÿÇç\s]+$/),
                country_name: Joi.string().required().regex(/^[a-zA-ZÀ-ÖØ-öø-ÿÇç\s]+$/)     // fetch from database, check if it needs validation
            })
        }),
    admin_funcionarioTokenValidation,
    destinationsController.postDestinations
);

// GET all destinations
router.get('/', TokenValidation, destinationsController.getDestinations);

// GET destination by ID
router.get('/:_id', TokenValidation, destinationsController.getDestinationById);

// GET destination by name
router.get('/city/:city_name', TokenValidation, destinationsController.getDestinationByName);

// GET destinations by COUNTRY (doesn't work yet)
router.get('/paises/:country_name', TokenValidation, destinationsController.getDestinationByCountry);

// PUT (OR PATCH) a destination by id
// router.put('/:id', destinationsController.putDestination);
router.put('/:city_name', admin_funcionarioTokenValidation, destinationsController.updateDestination);


// router.delete('/:city_name', destinationsController.deleteNameDestination);
router.delete('/:city_name', adminTokenValidation, destinationsController.deleteDestination);

// EXPORT the router so we can import it in the server
module.exports = router;