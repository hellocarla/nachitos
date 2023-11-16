// /api/virus/{código_virus}/surtos
// Obter informação todos os surtos ocorridos associados ao vírus referido

// tenho de ir buscar info à pág de vírus por cod_virus e depois associar a surtos

var express = require('express');
var Surtos = require('../app/models/surtos');
var Virus = require('../app/models/virus');
var router = express.Router();

// on routes that end in /surtos
// ou seja, para todos os surtos


router.post('/', async function (req, res) {

        var surtos = new Surtos();      // create a new instance of the surtos model
        surtos.cod_surto = await Virus.findOne({ nome: req.params.namevirus}).exec();    // req.body.cod_surto; pede nome (neste caso código) do surto
        surtos.zonageo = req.body.zonageo;
        surtos.data_inicio = req.body.data_inicio;
        surtos.data_fim = req.body.data_fim;

        surtos.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'Surto criado. oh no!' });
        });

});


/*

    cod_surto: {type: Number, nullable:false}, //será assim??
    cod_zonageo: {type: Number, nullable:false},
    data_inicio: {type: Date, nullable:false},
    data_fim: {type: Date, nullable:false}

*/


router.get('/', function(req,res) {
    Surtos.find(function(err, surtos) {
        if(err)
            res.send(err);
        res.json(surtos);
    });
});

// agora routes que acabam em surtos/cod_surto
// atenção que desta vez não é surtos/cod_surto, é
// virus/cod_virus/surtos
// logo na verdade a route não acaba em surto/cod e tenho de modificar isto

router.get('/:cod_surto', function(req,res) {
    Surtos.findById(req.params.cod_surto, function(err, surtos) {
        if(err)
            res.send(err);
        res.json(surtos);
    });
});



module.exports=router;