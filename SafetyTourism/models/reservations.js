// NOT MONGOOSED YET -- ON PURPOSE
const mongoose = require('mongoose');

const ReservationsSchema = new mongoose.Schema({
    res_client: String,     // fetches client id/code
    res_pack: String        // fetches pacquage picked by client
});

module.exports = mongoose.model('reservations', ReservationsSchema);