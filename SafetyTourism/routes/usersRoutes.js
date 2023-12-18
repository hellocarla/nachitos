// here we add pointers to functions that are called through the controller

// IMPORT requirements
const express = require('express');
const { celebrate, Joi } = require('celebrate');
// IMPORT the controller
const usersController = require('../controllers/usersController');
var router = express.Router();


// POST of new reservation WITH JOI (YAY)
router.post('/', celebrate({
            body: Joi.object({
                user_name: Joi.string().required().min(2).regex(/^[a-zA-Z]+( [a-zA-Z]+)*$/),
                // password validation pending
                user_email: Joi.string().email({ minDomainSegments: 2 }).lowercase().required(),        // fazer teste para falhar e pesquisar validação correcta

                user_address: Joi.string().min(10),/*.valid("Rua",
                                                        "Avenida",
                                                        "Travessa",
                                                        "Praça",
                                                        "Praceta",
                                                        "Ruela",
                                                        "Bairro", " "),*/
                user_postal: Joi.string().min(4).max(7).regex(/^[0-9-]+( [0-9-]+)$/),
                user_phone: Joi.string().min(9).max(15).regex(/^[0-9]$/),
                user_nif: Joi.string().min(7).max(20).regex(/^[0-9]$/)
            })
        }),
    usersController.createUser
);


// GET all reservations
router.get('/', usersController.getUsers);

// GET reservation by ID 
router.get('/:id', usersController.getUserById);

// GET reservations by client ID 
router.get('/user/:user_name', usersController.getUserByName);

// UPDATE reservation by ID
router.put('/:id', usersController.updateUser);

// DELETE reservation by ID
router.delete('/:id', usersController.deleteUser);

// EXPORT the router so we can import it in the server
module.exports = router;