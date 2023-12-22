// IMPORT SQL LITE MODULE
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

// INITIALIZE SQLite database connection
const db = new sqlite3.Database('./userDB.db');

// USER SCHEMA
/*const UsersqlSchema = {
    // userId: { type: String, required:true, unique: true },        // if SQL, then starting at xxxx and incrementing automatically (PRIMARY KEY, NOTNULL, AUTOINCREMENT)
    // { autoincrement: true}
    // confirmar como começar o campo do id para prevenir SQL injection
    //user_id: { type: Number, },
    user_name: { type: String, required: true },
    user_pw: { type: String, required: true },
    user_email: { type: String, required: true, unique: true }
};
*/

// create a function to hash the passwords
const hashPassword = async (user_pw) => {
    const saltRounds = 10;
    return await bcrypt.hash(user_pw,saltRounds);
};

// save user with hashed password
const saveUser = async (user_name,
                        user_email,
                        user_pw) => {
   const hashedPassword = await hashPassword(user_pw);
    db.run(`INSERT INTO users (user_name, user_email, user_pw) VALUES (?,?,?)`,
                                [user_name, user_email, hashedPassword]);
                        };


//UsersqlSchema,

// EXPORTS
module.exports = {
    saveUser
}