/*IMPORTS
//const UsersSQL = require('../models/usersSQL');
const sqlite3 = require('sqlite3').verbose();
//const RegUserRoutes = require('../routes/RegUserRoutes');
const db = new sqlite3.Database('./userDB.db');
const { saveUser } = require('../models/usersSQL');


//POST (&save) Users
const postUsers = async function (req, res) {
        user_name = req.body.user_name,
        user_email = req.body.user_email,
        user_pw = req.body.user_pw,
        user_type = req.body.user_type,
        user_NIF = req.body.user_NIF,
        user_address = req.body.user_address,
        user_phonenumber = req.body.user_phonenumber;
        // save and check for errors
        saveUser(user_name, user_email, user_pw, user_type, user_NIF, user_address, user_phonenumber)
        .then((user) => {
            res.send('User criado');
        })
        .catch((err) => {
            res.send(err);
        })
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

//DELETE
function deleteUsers(req, res) {
    const id = req.params.id; 
    db.get(`SELECT * FROM users WHERE id = ?`, [id], (error, row) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (!row) {
            return res.status(404).json({ error: 'User not found' });
        } else {
            db.run(`DELETE FROM users WHERE id = ?`, [id], (error, row) => {
                if (error) {
                    console.error(error.message);
                    return res.status(500).json({ error: 'Internal server error' });
                } else {
                    res.json({message: "User apagado!"});
                }
            });
        };
    });
};


// DROP table
//db.run("DROP TABLE users");   // or we can use a query & call it in a function

// EXPORTS
module.exports={
    postUsers,
    getUsers,
    getUsersbyId,
    updateUsers,
    deleteUsers
}
*/
