// /api/virus/{código_virus}/surtos
// Obter informação todos os surtos ocorridos associados ao vírus referido
// tenho de ir buscar info à pág de vírus por cod_virus e depois associar a surtos

var express = require('express');
var Surtos = require('../app/models/surtos');
var Virus = require('../app/models/virus');
var Zona = require('../app/models/zona');
var router = express.Router();

// on routes that end in /surtos
// ou seja, para todos os surtos

// POST http://localhost:8082/api/surtos
router.post('/', async function (req, res) {

        var surto = new Surtos();      // criar uma instância do modelo de surtos
        surto.cod_surto = req.body.cod_surto;
        const virus = await Virus.findOne({cod_virus: req.body.cod_virus}).exec();
        surto.cod_virus= virus._id;
        const zona = await Zona.findOne({cod_zonageo: req.body.cod_zonageo})
        surto.cod_zonageo = zona._id;
        //surto.cod_zonageo = req.body.cod_zonageo;
        surto.data_inicio = req.body.data_inicio;
        surto.data_fim = req.body.data_fim;

        // guardar o surto
        surto.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'new pandemic: unlocked' });
        });

});

// GET http://localhost:8082/api/surtos

router.get('/', function(_req,res) {
    Surtos.find(function(err, surtos) {
        if(err)
            res.send(err);

        res.json(surtos);
    });
});



router.put('/:cod_zona/:cod_virus', async function (req, res) {
    try {

        // Encontra surto com base nos códigos de zona e vírus
        const surto = await Surtos.findOne({
            cod_zonageo: req.params.cod_zona,
            cod_virus: req.params.cod_virus
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

module.exports=router;