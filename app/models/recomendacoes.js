var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecomendacoesSchema = new Schema({
    cod_pais: {type: Schema.Types.ObjectId, ref: 'paises'}, //FK para ligar as recomendações aos países
    cod_recomendacao: {type: String, required:true, unique: true},    //alterei para String
    cod_zonageo: {type: Schema.Types.ObjectId, ref: 'zona'}, //FK para ligar as recomendações às zonas
    data_nota: {type: Date, required: true},    //alterei nullable para required
    validade_nota: {type: Date, required: true}, //ver a questão da validade em dias        //alterei nullable para required
    recomendacao_texto: {type: String, default: null}  // código para conseguir alterar a recomendação (texto)      //alterei nullable para required
});
module.exports = mongoose.model('recomendacoes', RecomendacoesSchema);