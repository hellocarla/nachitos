var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PaisesSchema   = new Schema({
    cod_pais: {type: String, nullable:false},
    nome_pais: {type: String, nullable:false},
    cod_zonageo: {type: String, nullable:false} //será number/string??
});

module.exports = mongoose.model('paises', PaisesSchema);