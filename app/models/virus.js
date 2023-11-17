var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var VirusSchema   = new Schema({
    cod_virus: {type: Number, required:true},   //alterei nullable para required
    nome_virus: {type: String, required:true}   //alterei nullable para required
});

module.exports = mongoose.model('virus', VirusSchema);