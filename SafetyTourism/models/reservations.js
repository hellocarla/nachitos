// NOT MONGOOSED YET -- ON PURPOSE
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReservationsSchema = new Schema({
    res_clientId: {type: Schema.Types.Object, ref:'users'},
    res_client: {type: Schema.Types.Object, ref:'users'},   // Client ID (depois tenho de ligar ao modelo cliente)
    res_city: {type: Schema.Types.Object, ref:'packages'},
    res_packageId: {type: Schema.Types.ObjectId, ref:'packages'},
    res_package: {type: Schema.Types.Object, ref:'packages'}  // Package ID 
});

//Pretendo que quando se pesquise a reserva de um cliente apareça
//client ID, package ID, city_name, pack_type.
module.exports = mongoose.model('reservations', ReservationsSchema);