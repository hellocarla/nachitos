//IMPORTS
//const UsersSQL = require('../models/usersSQL');
const sqlite3 = require('sqlite3').verbose();
//const RegUserRoutes = require('../routes/RegUserRoutes');
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

function getUsersbyId(req, res) {
    const id = req.params.id; 
    db.get(`SELECT * FROM users WHERE id = ?`, [id], (error, row) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (!row) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(row);
    });
};

//UPDATE user 
function updateUsers(req, res) {
    const id = req.params.id; 
    const nome = req.body.user_name;

    db.run(`UPDATE users SET user_name = ? WHERE id = ?`, [nome, id], function(error) {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Internal server error' });
        }
        
        if (this.changes === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.json({ message: "UPDATE bem sucedido!" });
    });
};
/*function updateUsers(req, res) {
    const id = req.params.id; 
    const nome = req.body.user_name;
    db.run(`UPDATE users SET user_name = ? WHERE id = ?`, [nome, id], (error, row) => {
        console.log(id + nome + "variável");
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (!row) {
            return res.status(404).json({ error: 'User not found' });
        }
        user_name= req.body.user_name;
        //user_name.save();
        res.json({ message: "UPDATE bem sucedido!" });
    });
};
*/

// DROP table
//db.run("DROP TABLE users");   // or we can use a query & call it in a function


// EXPORTS
module.exports={
    postUsers,
    getUsers,
    getUsersbyId,
    updateUsers
}
