// here we add pointers to functions that are called through the controller

// IMPORT requirements
const express = require('express');
const { celebrate, Joi } = require('celebrate');
// IMPORT the controller
const destinationsController = require('../controllers/destinationsController');
var router = express.Router();
// Ligação à API OMS
var APIligacao = require('node-rest-client').Client;
var APIaddress = "http://localhost:8080/api/paises";


// POST new destination
//Router.post('/', destinationsController.postDestinations);      //controllerName.functionName
// THIS -----------------^ is a POINTER to a function, not the function itself
// this allows express to execute the function for us when a request reaches this route


// POST WITH JOI (YAY)
router.post('/', celebrate({
            body: Joi.object({
                //city_name: Joi.string().required().regex(/^[a-zA-Z]+( [a-zA-Z]+)*$/),
                city_name: Joi.string().required().regex(/^[a-zA-ZÀ-ÖØ-öø-ÿÇç\s]+$/),
                city_desc: Joi.string().min(5).max(280).regex(/^[a-zA-ZÀ-ÖØ-öø-ÿÇç\s]+$/),
                country_name: Joi.string().required().regex(/^[a-zA-ZÀ-ÖØ-öø-ÿÇç\s]+$/)     // fetch from database, check if it needs validation
            })
        }),
    destinationsController.postDestinations
);


// GET all destinations
router.get('/', destinationsController.getDestinations);

router.get('/:_id', destinationsController.getDestinationById);

router.get('/city/:city_name', destinationsController.getDestinationByName);

// PUT (OR PATCH) a destination by id

// router.put('/:id', destinationsController.putDestination);

router.put('/:city_name', destinationsController.updateDestination);


// DELETE a destination by id
    //just for testing!!! global warming hasn't erradicated any cities yet

// router.delete('/:city_name', destinationsController.deleteNameDestination);
router.delete('/:city_name', destinationsController.deleteDestination);

// EXPORT the router so we can import it in the server
module.exports = router;