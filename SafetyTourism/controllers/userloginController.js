/*IMPORTS
const sqlite3 = require('sqlite3').verbose();
//const RegUserRoutes = require('../routes/RegUserRoutes');
const db = new sqlite3.Database('./userDB.db');
const { saveUser } = require('../models/usersSQL');
const userSqlController = require('../controllers/userSqlController');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keyFile = require('../secret.key');


//POST user
function postloginUsers(req, res) {
    const { user_name, user_pw } = req.body;
    // Authenticate user
    fetchUserByUsername(user_name)
    .then((user) => {
        if (user) {
            const hashedPasswordFromDB = user.user_pw; // Assuming 'password' is the column name in the database
            comparePasswords(user_pw, hashedPasswordFromDB)
            .then((passwordsMatch) => {
                if (passwordsMatch) { //igual a if(passwordMatch==true)
                    // If authentication succeeds, generate JWT token
                    const authData = { 
                        userid: user.id,
                        username: user.user_name,
                        userRole: user.user_type
                    };

                    const token = jwt.sign(authData, keyFile.securekey , { expiresIn: '1h' });

                    res.status(200).json({ userToken: token });
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



// Function to fetch user by username
const fetchUserByUsername = (user_name) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE user_name LIKE ?', [user_name], (err, row) => {
            if (err) {
                reject(err); //Erros de sintaxe na query, servidor desligado
            } else {
                resolve(row); // se conseguir executar (pode haver um resultado ou retornar vazio)
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
*/