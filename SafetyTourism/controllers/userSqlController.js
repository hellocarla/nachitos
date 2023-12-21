//IMPORTS
const UsersSQL = require('../models/usersSQL');
const sqlite3 = require('sqlite3').verbose();
const RegUserRoutes = require('../routes/RegUserRoutes');
const db = new sqlite3.Database('./userDB.db');
const { saveUser } = require('../models/usersSQL');

//POST (&save) Users
function postUsers(req, res) {

    // var sqlUser = new UsersSql();
    // const { user_name, user_email, user_pw } = req.body;
    user_name = req.body.user_name,
    user_email = req.body.user_email,
    user_pw = req.body.user_pw;

    // save and check for errors
    saveUser(user_name, user_email, user_pw);
    
    /*sqlUser.save(function (err) {
        if (err)
            res.send(err);
    });
    */
    res.json({ message: 'user created in sql' });
};

//GET all Users
function getUsers(req, res) {
    db.all(`SELECT * FROM users`, (error, rows) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Internal server error' });
        }
        const users = rows.map(row => row); 
        res.json(users);
    });
}


// DROP table
//db.run("DROP TABLE users");   // or we can use a query & call it in a function


// EXPORTS
module.exports={
    postUsers,
    getUsers
}
