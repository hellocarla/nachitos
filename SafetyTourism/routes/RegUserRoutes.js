// IMPORTS
const express = require('express');
const userSqlController = require('../controllers/userSqlController');
const router = express.Router();
const admin_funcionarioTokenValidation = require('../middleware/Auth_admin_func');
const adminTokenValidation = require('../middleware/Auth_admin');

//POST a user
router.post('/', userSqlController.postUsers);

//GET all Users
router.get('/', admin_funcionarioTokenValidation, userSqlController.getUsers);

//GET user by ID
router.get('/user/:id',admin_funcionarioTokenValidation, userSqlController.getUsersbyId);

// UPDATE (patch) a user
router.put('/:id',userSqlController.updateUsers);

// DELETE a user
router.delete('/:id', adminTokenValidation, userSqlController.deleteUsers);

module.exports = router;