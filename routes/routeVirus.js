var express = require('express');
var Virus = require('../app/models/virus');
var router = express.Router();

// on routes that end with /virus
// ou seja, todos os caminhos que passarem pelo model/virus

// POST http://localhost/8081/api/virus
router.post('/', function (req, res) {

    var virus = new Virus();                            // criar instância de modelo de virus
    virus.cod_virus = req.body.cod_virus;               // aqui vão os valores que queremos
    virus.nome_virus = req.body.nome_virus;

    virus.save(function (err) {                         // função para guardar o virus
        if (err)
            res.send(err);

        res.json({ message: 'new virus! wash your hands!' });       // mensagem de sucesso
    });

});


// aqui busca todos os virus

router.get('/', function(_req,res) {
    Virus.find(function(err, virus) {
        if(err)
            res.send(err);

        res.json(virus);
    });
});


// GET: /api/virus/{código_virus}/surtos -- Obter informação todos os surtos ocorridos associados ao vírus referido


// on routes that end with /virus/{cod_virus}/surtos
// ou seja, vai buscar o virus com este ID e mostra os surtos (quando eu perceber como se faz)

// GET http://localhost:8081/api/virus/{cod_virus}/surtos

// falta justar istgo à info dos surtos

router.get('/:cod_virus/surtos', function(req,res) {                // request e response de pedidos get baseados no id do virus
    Virus.findById(req.params.cod_virus, function(err, virus) {     // find by id do código do virus
                                                                    // lembrando que aqui o cod_virus não mostra completamente correcto
                                                                    // mas usando o valor do '_id' funciona perfeitamente
                                                                    // falta a info do surto associado... acho que aqui tenho de trocar para uma função async
        if(err)
            res.send(err);
        res.json(virus);                                    // confirmar se este código está correcto | confirmado, obrigada carla do passado
    });
});

module.exports=router;

