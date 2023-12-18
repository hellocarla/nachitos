// NOT MONGOOSED YET -- ON PURPOSE
const mongoose = require('mongoose');

// will be using SQL for this, make appropriate changes

const UsersSchema = new Schema({
    user_id: { type: string },        // if SQL, then starting at xxxx and incrementing automatically (PRIMARY KEY, NOTNULL, AUTOINCREMENT)
    // { autoincrement: true}
    // confirmar como começar o campo do id para prevenir SQL injection
    user_name: { type: string, required: true },
    user_pw: { type: string, required: true },
    user_email: { type: string, required: true },
    user_type: { type: string, default: "client" },      // admin, func, client

    user_check: { type: boolean, default: "false" },    // boolean for admin to validate user

    // not required until reservation
    user_address: { type: string, default: null },
    user_postal: { type: string, default: null },
    user_phone: { type: string, default: null },
    user_nif: { type: string, default: null }

    // every var except user_id & user_nif gets changed to null if client deletes account & has bookings

});

module.exports = mongoose.model('users', UsersSchema);