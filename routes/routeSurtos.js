// /api/virus/{código_virus}/surtos
// Obter informação todos os surtos ocorridos associados ao vírus referido
// tenho de ir buscar info à pág de vírus por cod_virus e depois associar a surtos

var express = require('express');
var Surtos = require('../app/models/surtos');
var Virus = require('../app/models/virus');
var router = express.Router();

// on routes that end in /surtos
// ou seja, para todos os surtos

// POST http://localhost:8081/api/surtos
router.post('/', async function (req, res) {

        var surto = new Surtos();      // criar uma instância do modelo de surtos
        surto.cod_surto = req.body.cod_surto;
        surto.codigo_virus = await Virus.findOne({ nome: req.params.namevirus}).exec();   
                                                // queria que a função visse se o código do virus faz match com algum que já exista
                                                // mas acho que assim teria de ser uma função async e quando fiz isso o código não funcionou
                                                // irei testar essa hipótese outra vez mais tarde
                                                // I might be on to something...
        surto.cod_zonageo = req.body.cod_zonageo;
        surto.data_inicio = req.body.data_inicio;
        surto.data_fim = req.body.data_fim;

        // guardar o surto
        surto.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'new pandemic: unlocked' });
        });

});

// GET http://localhost:8081/api/surtos

router.get('/', function(_req,res) {
    Surtos.find(function(err, surtos) {
        if(err)
            res.send(err);

        res.json(surtos);
    });
});


// agora routes que acabam em api/surtos/virus/{cod_virus}
// GET http://localhost:8081/api/surtos/virus/{código_virus}
// Obter informação sobre todos os surtos ativos associados ao vírus referido

/*
router.get('/virus/:cod_virus', function(req,res) {
    Virus.findById(req.params.cod_virus, function(err, surtos) {
                                            // pretty sure I need an async here
                                            // para relacionar os surtos com os virus
                                            // cars / bears situation etc
        if(err)
            res.send(err);
        res.json(surtos);
    });
});
*/


// adaptado do route/cars que a prof nos ensinou, mas não está a funcionar (algum erro nos nomes? perhaps...)

/*
router.get('/virus/:cod_virus', async function (_req,res) {
    try {
        const surtos = await Surtos.find().exec();
        if(surtos) {
            var pandemia = [];
            for (surto of surtos) {
                const codigo_virus = await Virus.findById(surto.codigo_virus).exec();
                if (codigo_virus) {
                    var pandemic = new Object();
                    pandemic.cod_surto = surto.cod_surto;
                    pandemic.codigo_virus = codigo_virus;
                    pandemic.cod_zonageo = surto.cod_zonageo;
                    pandemic.data_inicio= surto.data_inicio;
                    pandemic.data_fim = surto.data_fim;
                    pandemia.push(pandemic);
                }

            }

            res.json(pandemia);
        }
    } catch(err) {
        res.send(err);
    }
});

*/


router.put('/:cod_zona/:cod_virus', async function (req, res) {
    try {

        // Encontra surto com base nos códigos de zona e vírus
        const surto = await Surtos.findOne({
            cod_zonageo: req.params.cod_zona,
            codigo_virus: req.params.cod_virus
        }).exec();

        // Verifica se pelo menos um surto foi encontrado
        if (!surto) {
            return res.json({ message: 'Nenhum surto encontrado para a alteração.' });
        }
            if ('data_fim' in req.body) {
                surto.data_fim = req.body.data_fim;
                await surto.save();
        }

        return res.json({ message: 'Data de fim alterada!' });
    } catch (error) {
        console.error(error);
        return res.json({ error: 'Erro no TRY' });
    }
});

 /*É SÓ PARA TESTES
router.delete('/:cod_surto', async function (req, res) {
    try {
        const resultadoExclusao = await Surtos.findByIdAndDelete(req.params.cod_surto);

        if (!resultadoExclusao) {
            return res.json({ message: 'Surto não encontrada ou já excluído!' });
        }
        res.json({ message: 'Surto eliminado!' });

    } catch (error) {
        console.error(error);
        res.json({ error: 'Erro no TRY!' });
    }
});

*/

module.exports = router;