var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

function validateCodSurto(value) {
    return /^S\d+/.test(value);        // Usa uma regex para verificar se o valor começa com S maiusculo.
}
var SurtosSchema   = new Schema({
    // id: {Schema.Types.ObjectId}, corrigir
    cod_surto: {type: String, required:true, unique:true, validate: [validateCodSurto, 'O campo cod_surto deve sempre seguir a estrutura de letra S maiúscula seguida de digitos. Exemplo: S001']}, 
    cod_zonageo: {type: Schema.Types.ObjectId, ref: 'zona'},    // FK que liga os surtos à zona 
    data_inicio: {type: Date, required:true},  
    data_fim: {type: Date, default: null, validate: {
            validator: function(value) {
                return !this.data_inicio || !value || this.data_inicio <= value;
            }, message: 'A data de fim deve ser posterior a data de início.'}},
    cod_virus: {type: Schema.Types.ObjectId, ref: 'virus' }
});

module.exports = mongoose.model('surtos', SurtosSchema);