// NOT MONGOOSED YET -- ON PURPOSE
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const DestinationsSchema = new Schema({
    city_name: String,      // name of city
    city_desc: String,      // brief description of city
    country_name: String    // country it belongs to (make it grab from database)
});

module.exports = mongoose.model('destinations', DestinationsSchema);