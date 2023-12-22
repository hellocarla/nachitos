//IMPORTS
const sqlite3 = require('sqlite3').verbose();
//const RegUserRoutes = require('../routes/RegUserRoutes');
const db = new sqlite3.Database('./userDB.db');
const { saveUser } = require('../models/usersSQL');
const userSqlController = require('../controllers/userSqlController');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keyFile = require('../secret.key');

function postloginUsers(req, res) {
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
}

/*
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
*/

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
const comparePasswords = (user_pw, hashedPassword) => {
    return bcrypt.compare(user_pw, hashedPassword);
};

module.exports={
    postloginUsers,
}