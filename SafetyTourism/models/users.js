// NOT MONGOOSED YET -- ON PURPOSE
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// will be using SQL for this, make appropriate changes

const UsersSchema = new Schema({
    userId: { type: String, required:true },        // if SQL, then starting at xxxx and incrementing automatically (PRIMARY KEY, NOTNULL, AUTOINCREMENT)
    // { autoincrement: true}
    // confirmar como começar o campo do id para prevenir SQL injection
    user_name: { type: String, required: true },
    user_pw: { type: String, required: true },
    user_email: { type: String, required: true },
    user_type: { type: String, default: "client" },      // admin, func, client
    user_check: { type: Boolean, default: "false" },    // boolean for admin to validate user
    // not required until reservation
    user_address: { type: String, default: null },
    user_postal: { type: String, default: null },
    user_phone: { type: String, default: null },
    user_nif: { type: String, default: null }

    // every var except user_id & user_nif gets changed to null if client deletes account & has bookings
});

module.exports = mongoose.model('users', UsersSchema);