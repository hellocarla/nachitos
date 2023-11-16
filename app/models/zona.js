var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ZonaSchema   = new Schema({
    cod_zonageo: {type: String, nullable:false}, //será number/string??
    nome_zonageo: {type: String, nullable:false}    
});

module.exports = mongoose.model('zona', ZonaSchema);