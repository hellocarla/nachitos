var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

/*var ZonaSchema   = new Schema({
    cod_zonageo: {type: String, required:true},
    nome_zonageo: {type: String, nullable:false}    
});
*/
var ZonaSchema   = new Schema({
    cod_zonageo: {type: String, required:true},
    nome_zonageo: {type: String, nullable:false}    
});

module.exports = mongoose.model('zona', ZonaSchema);
