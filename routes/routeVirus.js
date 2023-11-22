var express = require('express');
var Virus = require('../app/models/virus');
var Surtos = require('../app/models/surtos');
var router = express.Router();

// on routes that end with /virus
// ou seja, todos os caminhos que passarem pelo model/virus

// POST http://localhost/8082/api/virus
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

router.get('/', function(req,res) {
    Virus.find(function(err, virus) {
        if(err)
            res.send(err);

        res.json(virus);
    });
});





// GET: /api/virus/{código_virus}/surtos -- Obter informação todos os surtos ocorridos associados ao vírus referido


// on routes that end with /virus/{cod_virus}/surtos
// ou seja, vai buscar o virus com este ID e mostra os surtos (quando eu perceber como se faz)

//Get todos os surtos de um vírus GET http://localhost:8082/api/virus/{cod_virus}/surtos
router.get('/:cod_virus/surtos', async function (req, res) {
    console.log(typeof(req.params.cod_virus), "inicio");
    const viros = await Virus.findOne({cod_virus: req.params.cod_virus}).exec();
    console.log(viros, "ola");
    console.log(viros._id);
    var surtos = await Surtos.find({codigo_virus:viros._id}).exec();
    console.log(surtos, "após surtos");
    var objetos = [];
    console.log(objetos, "hello");
    
    
    for (const surto of surtos) {
        var fimSurto = surto.data_fim;
        if(fimSurto==null){
            objetos.push(surto);
        }
    }
    res.json(objetos);
    
});


module.exports = router;