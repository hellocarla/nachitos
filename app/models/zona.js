var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ZonaSchema   = new Schema({
    cod_zonageo: {type: String, required:true},     //será number/string??  //alterei nullable para required
    nome_zonageo: {type: String, required:true}    //alterei nullable para required 
});

module.exports = mongoose.model('zona', ZonaSchema);

