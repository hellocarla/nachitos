var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SurtosSchema   = new Schema({
    // id: {Schema.Types.ObjectId}, corrigir
    cod_surto: {type: String, required:true, unique:true}, 
    cod_zonageo: {type: Schema.Types.ObjectId, ref: 'zona'},    // FK que liga os surtos à zona 
    data_inicio: {type: Date, required:true},  
    data_fim: {type: Date, validate: {
            validator: function(value) {
                return !this.data_inicio || !value || this.data_inicio <= value;
            }, message: 'A data de fim deve ser posterior a data de início.'}, default: null},
    cod_virus: {type: Schema.Types.ObjectId, ref: 'virus' }
});

module.exports = mongoose.model('surtos', SurtosSchema);