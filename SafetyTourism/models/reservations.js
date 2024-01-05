// NOT MONGOOSED YET -- ON PURPOSE
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReservationsSchema = new Schema({
    res_clientId: {type: Schema.Types.Object, ref:'usersSQL'},
    res_client: {type: Schema.Types.Object, ref:'usersSQL'}, 
    res_city: {type: Schema.Types.Object, ref:'packages'},
    res_packageId: {type: Schema.Types.ObjectId, ref:'packages'},
    res_package: {type: Schema.Types.Object, ref:'packages'}  // Package ID 
});

module.exports = mongoose.model('reservations', ReservationsSchema);