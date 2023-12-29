// IMPORTS
const express = require('express');
const userSqlController = require('../controllers/userSqlController');
const router = express.Router();

//POST a user
router.post('/', userSqlController.postUsers);

//GET all Users
router.get('/', userSqlController.getUsers);

//GET user by ID
router.get('/user/:id',userSqlController.getUsersbyId);

// UPDATE (patch) a user
router.put('/:id',userSqlController.updateUsers);

// DELETE a user
router.delete('/:id',userSqlController.deleteUsers);

module.exports = router;