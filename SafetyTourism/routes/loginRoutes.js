// Create a registration route in a separate file (e.g., authRoutes.js)
const express = require('express');
//const { saveUser } = require('../models/user');
const router = express.Router();
const keyFile = require('../secret.key');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const { id, user_pw } = req.body;
    console.log(req.body);
    // Authenticate user
    fetchUserByUsername(id)
    .then((user) => {
        if (user) {
            const hashedPasswordFromDB = user.user_pw; // Assuming 'password' is the column name in the database
            console.log(user.user_pw);
            comparePasswords(user_pw, hashedPasswordFromDB)
            .then((passwordsMatch) => {
                if (passwordsMatch) {
                    // If authentication succeeds, generate JWT token
                    const authData = { 
                        username: user.id,
                        //userRole: user.type 
                    };

                    const token = jwt.sign(authData, keyFile.securekey , { expiresIn: '1h' });

                    res.send({ 
                        username: user.id,
                        //userRole: user.type,
                        userToken: token 
                    });
                } else {
                    res.send('Incorrect password');
                }
            })
            .catch((error) => {
                res.send(error);
            });
        } else {
            res.send('User not found');
        }
    })
    .catch((error) => {
        res.send(error);
        console.log(error);
    });
});

// Function to fetch user by username
const fetchUserByUsername = (id) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row); // Resolve with user data (if found)
            }
        });
    });
};

// Function to compare hashed passwords
const comparePasswords = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

module.exports = router;