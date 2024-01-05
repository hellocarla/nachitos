//IMPORTS
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./userDB.db');
const asyncHandler = require("express-async-handler");
const { saveUser } = require('../models/usersSQL');
const { hashPassword } = require('../models/usersSQL');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keyFile = require('../secret.key');


//User registration - POST & save
const regUsers = async function (req, res) {
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

//User Login - POST & save 
function loginUsers(req, res) {
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

//GET current user
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
})


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

//Get users by ID 
function getUsersbyId(req, res) {
const id = req.params.id;
if(req.user.userRole == "func" || req.user.userRole == "admin"){
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
} else {
    db.get(`SELECT * FROM users WHERE id = ?`, [id], (error, row) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if(row.id !== req.user.userid){
            return res.status(403).json({ error: 'User not authorized to see other user information' });
        }
        if (!row) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(row);
})
};
};

//UPDATE user 
async function updateUsers(req, res) {
const id = req.params.id; 
const updates = req.body; // Dados para atualização

if (updates.hasOwnProperty('user_pw')) {
    try {
        const hashedPassword = await hashPassword(updates.user_pw);
        updates.user_pw = hashedPassword; // Substitui a senha não criptografada pela criptografada
    } catch (error) {
        console.error('Erro ao encriptar password:', error);
        return res.status(500).json({ error: 'Erro ao encriptar password' });
    }
}
//A função keys identifica os campos no objeto JSON, selecionando o que está atrás dos dois pontos
const campos = Object.keys(updates); 
const setValues = campos.map(key => `${key} = ?`).join(', ');
//if()

const values = campos.map(key => updates[key]);
values.push(id); // Adicionando o ID no final do array para o WHERE clause

if(req.user.userRole == "func" || req.user.userRole == "admin"){
    const sql = `UPDATE users SET ${setValues} WHERE id = ?`;
    db.run(
        sql,
        values,
        function(error) {
            if (error) {
                console.error(error.message);
                return res.status(500).json({ error: 'Internal server error' });
            }
            
            if (this.changes === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            
            res.json({ message: "UPDATE bem sucedido!" });
        });
}
if (req.user.userRole == "client" && id == req.user.userid) {
    const sql = `UPDATE users SET ${setValues} WHERE id = ?`;
    db.run(
        sql,
        values,
        function(error) {
            if (error) {
                console.error(error.message);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.json({ message: "UPDATE bem sucedido!" });
        });
} else {
    return res.status(403).json({ error: 'User not authorized to update other user information' });
}
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
regUsers,
loginUsers,
currentUser,
getUsers,
getUsersbyId,
updateUsers,
deleteUsers
}


/*
//IMPORTS
const Users = require('../models/users');

// POST A USER (register)
const createUser = async function (req,res) {
    try {
        const check_user = await Users.findOne({user_email: req.body.user_email}).exec();
    if(check_user) {
        return res.status(409).json({message: "that e-mail is taken bestie"})
    }

    var user = new Users({
        userId: req.body.userId,
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_pw: req.body.user_pw
    });

    user.save(function(err) {
        if(err) {
            res.send(err),
            console.log("error saving user. you can't save them all </3");
        } else {
            res.json({message: "you made a new friend!"});
        }
    });
    }
    catch (error) {
        console.error(error);
       res.status(500).json({message: "error during try. get better lol"}); 
    }
};

// GET ALL
const getUsers = function (req,res) {
    Users.find(function(err,users) {
        if(err)
            res.send(err);

        res.json(users);
    });
};

/* GET user by id
const getUserById = function (req,res) {
    Users.findById(req.params._id, function(err, thisguy) {
        if(err)
            res.send(err);
        res.json(thisguy);
    });
};


// GET user by code
/*const getUserByCode = function (req,res) {
    Users.findOne(req.params.userId, function(err, thisguy) {
        console.log(req.params.userId);
        if(err)
            res.send(err);
        res.json(thisguy);
    });
};


const getUserByCode = async function (req,res) {
    try {
        const check_user = await Users.find({userId: req.params.userId}).exec();
        if(!check_user) {
            return res.status(404).json({message: "User não existe!"})
        }
        res.json(check_user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({message: "erro durante o try"});
    }
};

// GET user by name
const getUserByName = async function (req,res) {
    try {
        const check_name = await Users.findOne({user_name: req.body.user_name}).exec();
        if(!check_name) {
            return res.status(404).json({message: "wrong name buddy"});
        }
        res.json(check_name);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({message: "try error"});
    }
}

// UPDATE user
// needs to be changed to PATCH instead
const updateUser = async function (req,res) {
    try {
        const update_user = await Users.findById(req.params.userId).exec();
        if(!update_user) {
            return res.json({message: "user not found, search better"});
        }

            update_user.user_name = req.body.user_name;
            update_user.user_email = req.body.user_email;
            update_user.user_pw = req.body.user_pw;
            update_user.user_address = req.body.user_address;
            update_user.user_postal = req.body.user_postal;
            update_user.user_phone = req.body.user_phone;
            update_user.user_nif = req.body.user_nif;

            await update_user.save();

        return res.json({message: "updated user v2.0"});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({message: "error for trying too hard, be chill"});
    }
};

// DELETE user
const deleteUser = async function(req,res) {
    try {
        var delete_user = await Users.findById({userId: req.params.userId}).exec();
        if(!delete_user) {
            return res.status(404).json({message: "user isn't real. this is all a simulation."});
        }
        const results = await Users.findByIdAndDelete(delete_user.userId);

        if(!results) {
            return res.json({message: "deleted user (or they never existed...)"});
        }
        res.json({message: "GONE!"});
    }
    catch (error) {
        console.error(error);
        res.json({error: "error while trying to delete user"});
    }
};

// EXPORTS
module.exports= {
    createUser,
    getUsers,
    //getUserById,
    getUserByCode,
    getUserByName,
    updateUser,
    deleteUser
}*/