var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// Função para garantir que o cod_zonageo comece com letra maiúscula.
function validateCodZonageo(value) {
    return /^Z\d+/.test(value);        // Usa uma regex para verificar se o valor começa com Z maiusculo.
}

var ZonaSchema   = new Schema({
    cod_zonageo: {type: String, required:true, unique:true, validate: [validateCodZonageo, 'O campo cod_zonageo deve sempre seguir a estrutura de letra Z maiúscula seguida de digitos. Exemplo: Z001']},     
    nome_zonageo: {type: String, required:true, unique:true}
});

module.exports = mongoose.model('zona', ZonaSchema);
