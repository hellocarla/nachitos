var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// Função para garantir que o cod_zonageo comece com letra maiúscula
function validateCodZonageo(value) {
    return /^[A-Z]/.test(value);        // Usa uma regex para verificar se a primeira letra é maiúscula
}

var ZonaSchema   = new Schema({
    cod_zonageo: {type: String, required:true, unique:true, validate: [validateCodZonageo, 'O codigo da zona geografica deve comecar com letra maiuscula']},     
    nome_zonageo: {type: String, required:true, unique:true}
});

module.exports = mongoose.model('zona', ZonaSchema);
