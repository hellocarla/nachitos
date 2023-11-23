var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecomendacoesSchema = new Schema({
    //cod_pais: {type: Schema.Types.ObjectId, ref: 'paises'},     //FK para ligar as recomendações aos países
    cod_recomendacao: {type: String, required:true, unique: true}, 
    cod_surto: {type: Schema.Types.ObjectId, ref: 'surtos'},    //FK para ligar as recomendações às surtos
    cod_zonageo: {type: Schema.Types.ObjectId, ref: 'zona'},    //FK para ligar as recomendações às zonas
    data_nota: {type: Date, required: true},    
    validade_nota: {type: Number, default:null}, 
    //validade_nota: {type: Date, required: true},      
    recomendacao_texto: {type: String, default: null}  
});
module.exports = mongoose.model('recomendacoes', RecomendacoesSchema);
