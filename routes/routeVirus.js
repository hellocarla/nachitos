// GET: /api/surtos/virus/{código_virus}
// o Obter informação sobre todos os surtos ativos associados ao vírus referido

var express = require('express');
var Virus = require('../app/models/virus');
var router = express.Router();

// on routes that end with /virus
// ou seja, todos os caminhos que passarem pelo model/virus


router.post('/', async function (req, res) {

    var virus = new Virus();      // create a new instance of the surtos model
    virus.cod_virus = req.body.cod_virus;
    virus.nome_virus = req.body.nome_virus;

    virus.save(function (err) {
        if (err)
            res.send(err);

        res.json({ message: 'new virus! wash your hands!' });
    });

});










// aqui busca todos os virus mas não é isso que quero

router.get('/', function(req,res) {
    Virus.find(function(err, virus) {
        if(err)
            res.send(err);

        res.json(virus);
    });
});

// on routes that end with /virus/virus_id
// ou seja, vai buscar o virus com este ID

router.get('/:cod_virus', function(req,res) {               // request e response de pedidos get baseados no id do virus
    Virus.findById(req.params.cod_virus, function(err, virus) {     // find by id do código do virus
        if(err)
            res.send(err);
        res.json(virus);                                    // confirmar se este código está correcto
    });
});