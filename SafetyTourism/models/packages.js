// NOT MONGOOSED YET -- ON PURPOSE
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const PackagesSchema = new mongoose.Schema({        // <-- why is it like this in the teacher's example?
    id: Schema.Types.ObjectId,
    city: {type: Schema.Types.ObjectId, ref: 'destinations'},    
    pack_desc: String,      // brief description of pacquage
    pack_price: String,     // price of pack(age) (does it change from type to type?)
    pack_type: String       // hotel, plane, hotel+plane
});

module.exports = mongoose.model('packages', PackagesSchema);