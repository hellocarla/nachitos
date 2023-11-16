var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SurtosSchema   = new Schema({
    // id: {Schema.Types.ObjectId}, corrigir
    cod_surto: {type: Number, nullable:false}, //será assim??
    cod_zonageo: {type: String, nullable:false},
    data_inicio: {type: Date, nullable:false},
    data_fim: {type: Date, default:null},
    codigo_virus: {type: Schema.Types.ObjectId, ref: 'Virus'}
});     // acho que assim vai criar um campo que busca o objecto virus por id

module.exports = mongoose.model('surtos', SurtosSchema);