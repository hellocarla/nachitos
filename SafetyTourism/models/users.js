// NOT MONGOOSED YET -- ON PURPOSE
const mongoose = require('mongoose');

// will be using SQL for this, make appropriate changes

const UserSchema = new mongoose.Schema({
    user_id: String,        // if SQL, then starting at xxxx and incrementing automatically
    user_name: String,
    user_pw: String,
    user_email: String,
    user_type: String,      // admin, func, client

    user_check: Boolean,    // boolean for admin to validate user

    // not required until reservation
    user_address: String,
    user_phone: String,
    user_nif: String

    // every var except user_id gets changed to null if client deletes account

});

module.exports = mongoose.model('users', UsersSchema);