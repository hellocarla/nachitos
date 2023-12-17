// NOT MONGOOSED YET -- ON PURPOSE
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ReservationsSchema = new Schema({
    res_client: String,     // Client ID (depois tenho de ligar ao modelo cliente)
    res_package: String        // Package ID 
});

//Pretendo que quando se pesquise a reserva de um cliente apareça
//client ID, package ID, city_name, pack_type.
module.exports = mongoose.model('reservations', ReservationsSchema);