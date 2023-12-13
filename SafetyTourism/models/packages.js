// NOT MONGOOSED YET -- ON PURPOSE
const mongoose = require('mongoose');

const PackagesSchema = new mongoose.Schema({        // <-- why is it like this in the teacher's example?
    city_name: String,      // name of city (fetch from destinations)
    pack_desc: String,      // brief description of pacquage
    pack_price: String,     // price of pack(age) (does it change from type to type?)
    pack_type: String       // hotel, plane, hotel+plane
});

module.exports = mongoose.model('packages', PackagesSchema);