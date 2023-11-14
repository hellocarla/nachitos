var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var VirusSchema   = new Schema({
    cod_virus: {type: Number, nullable:false},
    nome_virus: {type: String, nullable:false}
});

module.exports = mongoose.model('virus', VirusSchema);