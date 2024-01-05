// here we add pointers to functions that are called through the controller

// IMPORT requirements
const express = require('express');
const { celebrate, Joi } = require('celebrate');
// IMPORT the controller
const reservationsController = require('../controllers/reservationsController');
var router = express.Router();
const admin_funcionarioTokenValidation = require('../middleware/Auth_admin_func');
const adminTokenValidation = require('../middleware/Auth_admin');
const TokenValidation = require('../middleware/Auth_geral');

// POST of new reservation WITH JOI (YAY)
router.post('/', celebrate({
            body: Joi.object({
                res_clientId: Joi.string().required(),
                res_packageId: Joi.string().required()
            })
        }),
    //TokenValidation,
    reservationsController.postReservations
);


// GET all reservations
router.get('/', reservationsController.getReservations);

// GET reservation by ID 
router.get('/:_id', TokenValidation, reservationsController.getReservationById);

// GET reservations by client ID (for client)
router.get('/reservation/:res_clientId', TokenValidation, reservationsController.getReservationByClient);

// UPDATE reservation by ID
router.put('/:_id', TokenValidation, reservationsController.updateReservationById);

// DELETE reservation by ID
router.delete('/:_id', adminTokenValidation, reservationsController.deleteReservationById);

// EXPORT the router so we can import it in the server
module.exports = router;