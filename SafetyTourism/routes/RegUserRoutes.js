// code note says: create a registration route in a separate file (e.g., authRoutes.js)
// put register and login/auth in a seperate page from other CRUDs
// seperate checkEmail function into middleware and import it here when needed (less clutter)

// IMPORTS
const express = require('express');
//const sqlite3 = require('sqlite3').verbose();
// IMPORTS FROM USERS IN SQL
//const UsersSql = require('../models/usersSQL');
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

/*
//como se integra?
function  checkEmail(user_email) {
    return new Promise((resolve,reject) => {
        db.get(`SELECT * FROM users WHERE user_email = ? `, [user_email], (err,row) => {
            if(err) {
                reject(err);
            }
            else {
                resolve(!!row);
            }
        });
    });
}
*/
// GET a specified user



// DELETE a user

module.exports = router;