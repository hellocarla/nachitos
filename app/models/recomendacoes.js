var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecomendacoesSchema = new Schema({
    cod_recomendacao: {type: Number, nullable: false},
    cod_zonageo: {type: Number, nullable: false},
    data_nota: {type: Date, nullable: false},
    validade_nota: {type: Date, nullable: false} //ver a questão da validade em dias
});

module.exports = mongoose.model('recomendacoes', RecomendacoesSchema);