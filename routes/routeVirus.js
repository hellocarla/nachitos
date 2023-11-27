var express = require('express');
var Virus = require('../app/models/virus');
var Surtos = require('../app/models/surtos');
var router = express.Router();


// POST http://localhost/8082/api/virus
router.post('/', async function (req, res) {
    const check_virus = await Virus.findOne({cod_virus: req.body.cod_virus})
    if (check_virus) {
        return res.status(409).json({ message: 'O vírus com o código ' + req.body.cod_virus + ' já existe!' });
    }
    const check_virus_nome = await Virus.findOne({nome_virus: req.body.nome_virus})
    if (check_virus_nome) {
        return res.status(409).json({ message: 'O vírus com o nome ' + req.body.nome_virus + ' já existe.' });
    }
    var virus = new Virus();                            // criar instância de modelo de virus
    virus.cod_virus = req.body.cod_virus;               // aqui vão os valores que queremos
    virus.nome_virus = req.body.nome_virus;

    virus.save(function (err) {                         // função para guardar o virus
        if (err)
            res.send(err);

        res.json({ message: 'new virus! wash your hands!' });       // mensagem de sucesso
    });

});


// GET de todos os virus http://localhost/8082/api/virus
router.get('/', function(req,res) {
    Virus.find(function(err, virus) {
        if(err)
            res.send(err);

        res.json(virus);
    });
});


//GET todos os surtos ocorridos de um vírus http://localhost:8082/api/virus/{cod_virus}/surtos
router.get('/:cod_virus/surtos', async function (req, res) {
    try{
    const viros = await Virus.findOne({cod_virus: req.params.cod_virus}).exec();

     // Se o vírus não existir, envia uma resposta a indicar que não foi encontrado
     if (!viros) {
        return res.status(404).json({ message: 'Virus com o código ' + req.params.cod_virus + ' não encontrado, surto não criado!' });
    }
    var surtos = await Surtos.find({cod_virus:viros._id}).exec();

    if (surtos.length===0) {
        return res.status(404).json({ message: 'Nenhum surto encontrado.' });
    }

    var objetos = [];
    
    for (const surto of surtos) {
        var fimSurto = surto.data_fim;
        if(fimSurto!=null){
            objetos.push(surto);
        }
    }
    res.json(objetos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no TRY!' });
    }
});


// Delete de um vírus cod código de vírus
router.delete('/:cod_virus', async function(req,res) {
    try {
        const resultadoExclusao = await Virus.findByIdAndDelete(req.params.cod_virus);

        if (!resultadoExclusao) {
            return res.json({ message: 'Vírus não encontrado ou já foi excluído!' });
        }
        res.json({ message: 'Vírus eliminado!' });

    } catch (error) {
        console.error(error);
        res.json({ error: 'Erro no TRY!' });
    }
});


module.exports = router;