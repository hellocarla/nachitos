var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function validateCodRecomendacao(value) {
    return /^R\d+/.test(value);        // Usa uma regex para verificar se o valor começa com R maiusculo.
}
function validarNumeroPositivo(value) {
        return value>0;
}

var RecomendacoesSchema = new Schema({
    cod_recomendacao: {type: String, required:true, unique: true, validate: [validateCodRecomendacao, 'O campo cod_recomendacao deve sempre seguir a estrutura de letra R maiúscula seguida de digitos. Exemplo: R001']}, 
    cod_surto: {type: Schema.Types.ObjectId, ref: 'surtos'},    //FK para ligar as recomendações às surtos
    cod_zonageo: {type: Schema.Types.ObjectId, ref: 'zona'},    //FK para ligar as recomendações às zonas
    data_nota: {type: Date, required: true},    
    validade_nota: {type: Number, required:true, default:0, validate: [validarNumeroPositivo, 'A validade da nota deve ser maior ou igual a 1 dia']},      
    recomendacao_texto: {type: String, required:true}  
});
module.exports = mongoose.model('recomendacoes', RecomendacoesSchema);
