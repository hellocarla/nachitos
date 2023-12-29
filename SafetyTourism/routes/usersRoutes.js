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
                userId: Joi.string(),
                user_name: Joi.string().required().min(2).regex(/^[a-zA-ZÀ-ÖØ-öø-ÿÇç\s]+$/),
                user_pw: Joi.string(),
                user_email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).lowercase().required()       // fazer teste para falhar e pesquisar validação correcta
/*
                user_address: Joi.string().min(10),/*.valid("Rua",
                                                        "Avenida",
                                                        "Travessa",
                                                        "Praça",
                                                        "Praceta",
                                                        "Ruela",
                                                        "Bairro", " "),
                user_postal: Joi.string().min(4).max(7).regex(/^[0-9-]+( [0-9-]+)$/),
                user_phone: Joi.string().min(9).max(15).regex(/^[0-9]$/),
                user_nif: Joi.string().min(7).max(20).regex(/^[0-9]$/)*/
            }).options({abortEarly: false})
        }),
    usersController.createUser
);


// GET all reservations
router.get('/', usersController.getUsers);

// GET user by _id 
//router.get('/:_id', usersController.getUserById);

// GET user by code(user_id) 
router.get('/user/:userId', usersController.getUserByCode);

// GET user by client ID 
router.get('/username/:user_name', usersController.getUserByName);

// UPDATE user by ID
router.put('/:user_id', usersController.updateUser);

// DELETE user by ID
router.delete('/:user_id', usersController.deleteUser);

// EXPORT the router so we can import it in the server
module.exports = router;