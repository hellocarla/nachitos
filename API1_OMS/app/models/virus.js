var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var VirusSchema   = new Schema({
    cod_virus: {type: String, required:true, unique:true, validate: {validator: function(value) {
        return /^V\d+/.test(value);
    }, message: 'O campo cod_virus deve sempre seguir esta estrutura de letra V maiúscula seguida de digitos. Exemplo: V001'}},   
    nome_virus: {type: String, required:true, unique:true}  
});

module.exports = mongoose.model('virus', VirusSchema);