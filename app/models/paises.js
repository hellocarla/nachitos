var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

//Função para garantir que o cod_pais tenha apenas 2 letras
function validateCodPais(value) {
    return /^[A-Z]{2}$/.test(value);        // Usa regex para verificar se o valor é uma combinação de 2 letras maiúsculas.
}

var PaisesSchema   = new Schema({
    cod_pais: {type: String, required:true, unique:true, validate: [validateCodPais, 'O codigo do pais deve ter exatamente duas letras maiusculas']},    
    nome_pais: {type: String, required:true, unique:true},   
    cod_zonageo: {type: Schema.Types.ObjectId, ref: 'zona'}  //FK para ligar os países às zonas
});

module.exports = mongoose.model('paises', PaisesSchema);