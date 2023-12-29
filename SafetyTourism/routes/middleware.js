/*
if this was the teacher's code, I'd insert:

    hashPassword
    saveUser
    checkUsernameExists

and then use the controller to perform the main logic
(in this case, creating a user)

*/

/*

// IMPORTS
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');   // <-- for password encryption
// user model
const usersql = require('./models/usersSQL');


// hash password
const hashPassword = async (usersql.user_pw) => {
    const saltRounds = 10;
    return await bcrypt.hash(usersql.user_pw, saltRounds);
};

// save user with hashed password
const saveUser = async (usersql.user_name, usersql.user_pw, usersql.user_email) => {
    const hashedPassword = await hashPassword(usersql.user_pw);
    db.run(`INSERT INTO users (usersql.user_name, usersql.user_pw, usersql.user_email) VALUES (?,?,?)`, [usersql.user_name, hashedPassword, usersql.user_email]);
};

module.exports = {
    saveUser
}

*/