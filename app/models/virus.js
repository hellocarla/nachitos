var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var VirusSchema   = new Schema({
    cod_virus: {type: String, required:true, unique:true},   
    nome_virus: {type: String, required:true, unique:true}  
});

module.exports = mongoose.model('virus', VirusSchema);