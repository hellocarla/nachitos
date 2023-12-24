// IMPORT SQL LITE MODULE
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

// INITIALIZE SQLite database connection
const db = new sqlite3.Database('./userDB.db');

// create a function to hash the passwords
const hashPassword = async (user_pw) => {
    const saltRounds = 10;
    return await bcrypt.hash(user_pw,saltRounds);
};

// save user with hashed password
const saveUser = async (user_name,
                        user_email,
                        user_pw,
                        user_type, 
                        user_NIF, 
                        user_address, 
                        user_phonenumber) => {
   const hashedPassword = await hashPassword(user_pw);
    db.run(`INSERT INTO users (user_name, user_email, user_pw, user_type, user_NIF, user_address, user_phonenumber) VALUES (?,?,?,?,?,?,?)`,
                                [user_name, user_email, hashedPassword, user_type, user_NIF, user_address, user_phonenumber]);
                        };


//UsersqlSchema,

// EXPORTS
module.exports = {
    saveUser
}