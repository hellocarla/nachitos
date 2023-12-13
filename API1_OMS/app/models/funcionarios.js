var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FuncionariosSchema = new Schema({
    nome_funcionario: {Type: String, required:true},
    cod_cc: {Type: String, required:true, unique:true},
    email_funcionario: {Type: String, required:true},
    password: {Type: String, required:true}
});

module.exports = mongoose.model('funcionarios', FuncionariosSchema);