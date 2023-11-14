var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SurtosSchema   = new Schema({
    cod_surto: {type: Number, nullable:false}, //será assim??
    cod_zonageo: {type: Number, nullable:false},
    data_inicio: {type: Date, nullable:false},
    data_fim: {type: Date, nullable:false} 
});

module.exports = mongoose.model('surtos', SurtosSchema);