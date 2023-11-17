var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PaisesSchema   = new Schema({
    cod_pais: {type: String, required:true},    //alterei nullable para required
    nome_pais: {type: String, required:true},   //alterei nullable para required
    cod_zonageo: {type: Schema.Types.ObjectId, ref: 'Zona'}     //FK para ligar os países às zonas
    
});

module.exports = mongoose.model('paises', PaisesSchema);