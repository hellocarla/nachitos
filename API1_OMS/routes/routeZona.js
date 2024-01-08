var express = require('express');
var Zona = require('../app/models/zona');
var Paises = require('../app/models/paises')
var router = express.Router();


// POST http://localhost:8080/api/zona
router.post('/', async function (req, res) {
    try{
        const check_zona = await Zona.findOne({cod_zonageo: req.body.cod_zonageo});
        if (check_zona) {
            return res.status(409).json({ message: 'A zona com o código ' + req.body.cod_zonageo + ' já existe!' });
        }
        const check_zona_nome = await Zona.findOne({nome_zonageo: req.body.nome_zonageo});
        if (check_zona_nome) {
            return res.status(409).json({ message: 'A zona com o nome ' + req.body.nome_zonageo + ' já existe.' });
        }
    var zona = new Zona();                            // criar instância de modelo de zona
    zona.cod_zonageo = req.body.cod_zonageo;             // aqui vão os valores que queremos
    zona.nome_zonageo = req.body.nome_zonageo;
    zona.save(function (err) {                         // função para guardar a zona
        if (err){
            res.send(err);
        } else {
             res.json({ message: 'new area unlocked!' });       // mensagem de sucesso
        } 
    });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no TRY!' });
    }
});


// GET de todas as zonas
router.get('/', function(_req,res) {
    Zona.find(function(err, zona) {
        if(err)
            res.send(err);

        res.json(zona);
    });
});


// Get de uma zona específica
router.get('/:cod_zonageo', async function(req,res) {
    try{
        const zona = await Zona.findOne({cod_zonageo: req.params.cod_zonageo});
        if (!zona) {
            return res.status(404).json({ message: 'A zona com o código ' + req.params.cod_zonageo + ' não existe!' });
        }
        res.json(zona);
    }  
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no TRY!' });
    }
});



// Delete de uma zona geográfica pelo código de zona
router.delete('/:cod_zonageo', async function (req, res) {
    try {
        var zona = await Zona.findOne({cod_zonageo:req.params.cod_zonageo}).exec();
            // Se a zona não existir, envia uma resposta a indicar que não foi encontrado
        if (!zona) {
            return res.status(404).json({ message: 'Zona com o código ' + req.params.cod_zonageo + ' não encontrado!' });
        }
        const resultadoExclusao = await Zona.findByIdAndDelete(zona._id);
        if (!resultadoExclusao) {
            return res.json({ message: 'Zona não encontrada ou já excluído!' });
        }
        res.json({ message: 'Zona eliminada!' });

    } catch (error) {
        console.error(error);
        res.json({ error: 'Erro no TRY!' });
    }
});


module.exports=router;