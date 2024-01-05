/* Create a registration route in a separate file (e.g., authRoutes.js)
const express = require('express');
//const { saveUser } = require('../models/user');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();


const userloginController = require('../controllers/userloginController');

//POST (Login do user)
router.post('/', userloginController.postloginUsers);

module.exports = router;

*/