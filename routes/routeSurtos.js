var express = require('express');
var Surtos = require('../app/models/surtos');
var Virus = require('../app/models/virus');
var Zona = require('../app/models/zona');
var router = express.Router();


// POST http://localhost:8082/api/surtos
router.post('/', async function (req, res) {
    try {
        const check_surto = await Surtos.findOne({cod_surto: req.body.cod_surto})
        if (check_surto) {
            return res.status(409).json({ message: 'O surto com o código ' + req.body.cod_surto + ' já existe!' });
        }
        var surto = new Surtos();      // criar uma instância do modelo de surtos
        surto.cod_surto = req.body.cod_surto;
        const virus = await Virus.findOne({cod_virus: req.body.cod_virus}).exec();
        
        // Se o vírus não existir, envia uma resposta a indicar que não foi encontrado
        if (!virus) {
            return res.status(404).json({ message: 'Virus com o código ' + req.body.cod_virus + ' não encontrado, surto não criado!' });
        }
        surto.cod_virus= virus._id;

        const zona = await Zona.findOne({cod_zonageo: req.body.cod_zonageo});
        if (!zona) {
            return res.status(404).json({ message: 'Zona geográfica com o código ' + req.body.cod_zonageo + ' não encontrada, surto não criado!' });
        }
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no TRY!' });
    }
});


// GET de todos os surtos http://localhost:8082/api/surtos
router.get('/', function(_req,res) {
    Surtos.find(function(err, surtos) {
        if(err)
            res.send(err);

        res.json(surtos);
    });
});


// Get dos surtos pelo código de surto
router.get('/:cod_surto', async function (req, res) {
    try {
    var surto = await Surtos.findOne({cod_surto:req.params.cod_surto}).exec();
         // Se o surto não existir, envia uma resposta a indicar que não foi encontrado
    if (!surto) {
        return res.status(404).json({ message: 'Surto com o código ' + req.params.cod_surto + ' não encontrado!' });
    }
    res.json(surto);

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no TRY!' });
     }
});


// Get dos vírus pelo código de vírus
router.get('/virus/:cod_virus', async function (req, res) {
    try {
        const viros = await Virus.findOne({ cod_virus: req.params.cod_virus }).exec();

        // Se o vírus não existir, envia uma resposta a indicar que não foi encontrado
        if (!viros) {
            return res.status(404).json({ message: 'Virus com o código ' + req.params.cod_virus + ' não encontrado!' });
        }

        var surtos = await Surtos.find({ cod_virus: viros._id }).exec();

        // Se nenhum surto for encontrado, envia uma resposta a indicar que não foram encontrados surtos
        if (surtos.length === 0) {
            return res.status(404).json({ message: 'Não existe nenhum surte associado ao virus ' + viros.nome_virus });
        }

        var objetos = [];

        for (const surto of surtos) {
            var fimSurto = surto.data_fim;
            if (fimSurto == null) {
                objetos.push(surto);
            }
        }
                // Se não existir nenhum surto ativo, retorna a mensagem que não foi encontrado nenhum surto
        if (objetos.length===0){

            res.json({ message:'Nenhum surto encontrado que corresponda aos parâmetros de pesquisa'});
        }
        else {
            res.json(objetos);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no TRY!' });
    }
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
            return res.json({ message: 'Nenhum surto encontrado para a alteração!' });
        }
            if ('data_fim' in req.body) {
                surto.data_fim = req.body.data_fim;
                await surto.save();
        }

        return res.json({ message: 'Data de fim alterada!' });
    } catch (error) {
        console.error(error);
        return res.json({ error: 'Erro no TRY!' });
    }
});


// Delete de um surto pelo código de surto
router.delete('/:cod_surto', async function (req, res) {
    try {
        var surto = await Surtos.findOne({cod_surto:req.params.cod_surto}).exec();
            // Se o surto não existir, envia uma resposta a indicar que não foi encontrado
        if (!surto) {
            return res.status(404).json({ message: 'Surto com o código ' + req.params.cod_surto + ' não encontrado!' });
        }
        const resultadoExclusao = await Surtos.findByIdAndDelete(surto._id);
        if (!resultadoExclusao) {
            return res.json({ message: 'Surto não encontrada ou já excluído!' });
        }
        res.json({ message: 'Surto eliminado!' });

    } catch (error) {
        console.error(error);
        res.json({ error: 'Erro no TRY!' });
    }
});


module.exports = router;