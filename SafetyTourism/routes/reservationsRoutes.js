// here we add pointers to functions that are called through the controller

// IMPORT requirements
const express = require('express');
const { celebrate, Joi } = require('celebrate');
// IMPORT the controller
const reservationsController = require('../controllers/reservationsController');
var router = express.Router();


// POST of new reservation WITH JOI (YAY)
router.post('/', celebrate({
            body: Joi.object({
                res_client: Joi.string().required(),
                res_package: Joi.string().required()
            })
        }),
    reservationsController.postReservations
);


// GET all reservations
router.get('/', reservationsController.getReservations);

// GET reservation by ID 
router.get('/:_id', reservationsController.getReservationById);

// GET reservation by client ID 
router.get('/reservation/:res_client', reservationsController.getReservationByClient);

// UPDATE reservation by ID
router.put('/:_id', reservationsController.updateReservationById);

// UPDATE reservation by client ID 
router.put('/reservation/:res_client', reservationsController.updateReservationByClient);

// DELETE reservation by ID
router.delete('/:_id', reservationsController.deleteReservationById);

// DELETE reservation by client ID
router.delete('/reservation/:res_client', reservationsController.deleteReservationByClient);

// EXPORT the router so we can import it in the server
module.exports = router;