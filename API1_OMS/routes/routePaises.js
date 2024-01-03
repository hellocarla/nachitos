var express = require('express'); 
var Paises = require('../app/models/paises');
var Zona = require('../app/models/zona');
var Recomendacoes = require('../app/models/recomendacoes');
var Surtos = require('../app/models/surtos');
var router = express.Router();

//TO DO - POST não pode aceitar preenchimento vazio " " no nome_pais


//POST http://localhost:8082/api/paises
router.post('/', async function (req, res) {
    try {
        // Verifica se o País com o código que vai no body já existe
    const check_pais = await Paises.findOne({cod_pais: req.body.cod_pais})
    if (check_pais) {
        return res.status(409).json({ message: 'O país com o código ' + req.body.cod_pais + ' já existe.' });
    }
        // Verifica se o País com o nome que vai no body já existe
    const check_pais_nome = await Paises.findOne({nome_pais: req.body.nome_pais})
    if (check_pais_nome) {
        return res.status(409).json({ message: 'O país com o nome ' + req.body.nome_pais + ' já existe.' });
    }
        const zona = await Zona.findOne({cod_zonageo: req.body.cod_zonageo})
    if (!zona) {
        return res.status(404).json({ message: 'Zona geográfica com o código ' + req.body.cod_zonageo + ' não encontrada, pais não criado!' });
    }
    
    var paises = new Paises();      // create a new instance of the Paises model
    paises.nome_pais = req.body.nome_pais;  // set the paises name (comes from the request)
    paises.cod_pais = req.body.cod_pais;
    paises.cod_zonageo = zona._id;
    paises.save(function (err) {
        if (err)
            res.send(err);
        res.json({ message: 'País criado!' });
    });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no TRY!' });
    }
});


// Obter/Pesquisar todos os países (accessed at GET http://localhost:8082/api/paises)
router.get('/all', function (req, res) {
    Paises.find(function (err, paises) {
        if (err){
            res.send(err);
        } else {
             res.json(paises);
        }
    });
});


// GET ALL de países com objecto ZONA
router.get('/', async function (req, res) {
    try {                                               
        const paises = await Paises.find().exec();       
        if (paises) {                                    
            var todos_paises = [];                          
            for (const pais of paises) {                 
                const zona_mae = await Zona.findById(pais.cod_zonageo).exec();   
                if (zona_mae) {                             
                    var pais_novo = new Object();  					
					pais_novo._id = pais._id;
                    pais_novo.nome_pais = pais.nome_pais;
                    pais_novo.cod_pais = pais.cod_pais;
                    pais_novo.cod_zonageo = zona_mae;                  
                    todos_paises.push(pais_novo);                
                }
            }

            res.json(todos_paises);               

        }

    } catch (err) {
        res.send(err);
    }
});



// Get de um país específico por nome
router.get('/nome/:nome_pais', async function(req,res) {
    try{
        const pais = await Paises.findOne({nome_pais: req.params.nome_pais});
        if (!pais) {
            return res.status(404).json({ message: 'O país com o nome ' + req.params.nome_pais + ' não existe!' });
        }
        res.json(pais);
    }  
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no TRY!' });
    }
});

// Get de um país específico
router.get('/:cod_pais', async function(req,res) {
    try{
        const pais = await Paises.findOne({cod_pais: req.params.cod_pais});
        if (!pais) {
            return res.status(404).json({ message: 'O país com o código ' + req.params.cod_pais + ' não existe!' });
        }
        res.json(pais);
    }  
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no TRY!' });
    }
});


// Get recomendações pelo código do país
router.get('/:cod_pais/recomendacoes', async function (req, res) {
    try{
    const pais = await Paises.findOne({cod_pais: req.params.cod_pais}).exec();

    if (!pais) {
        return res.status(404).json({ message: 'País com o código ' + req.params.cod_pais+ ' não encontrado!' });
    }

    const zona = await Zona.findById(pais.cod_zonageo).exec();
    if (!zona) {
        return res.status(404).json({ message: 'Zona geográfica não encontrada!' });
    }

    var recs = await Recomendacoes.find({cod_zonageo:zona._id}).exec();

    if (recs.length===0) {
        return res.status(404).json({ message: 'Recomendações para zona geográfica com o código ' + zona.cod_zonageo + ' não encontradas!' });
    }

    var objetos = [];
    for (const recomendacao of recs) {
        var fimRecomendacoes = new Date (recomendacao.data_nota);
        fimRecomendacoes.setDate(fimRecomendacoes.getDate() + recomendacao.validade_nota);
        var hoje = new Date();
        if(fimRecomendacoes>=hoje){
            objetos.push(recomendacao);
        }
    }
    res.json(objetos);
    }  
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no TRY!' });
    }
});


// GET surtos ativos
router.get('/:cod_pais/surtos', async function (req, res) {
    try{
        const pais = await Paises.findOne({cod_pais: req.params.cod_pais}).exec();
    
        if (!pais) {
            return res.status(404).json({ message: 'País com o código ' + req.params.cod_pais+ ' não encontrado!' });
        }
    
        const zona = await Zona.findById(pais.cod_zonageo).exec();
        if (!zona) {
            return res.status(404).json({ message: 'Zona geográfica não encontrada!' });
        }
        var surtos = await Surtos.find({cod_zonageo:zona._id}).exec();
        if (surtos.length===0) {
            return res.status(404).json({ message: 'Nenhum surto encontrado.' });
        }
    var objetos = [];

    for (const surto of surtos) {
        var fimSurto = surto.data_fim;
        if(fimSurto==null){
            objetos.push(surto);
        }
    }
    permittedValues = array.map(function(value) {
        return value.key;
      });
    res.json(objetos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no TRY!' });
    }
});


// Delete de um país pelo código de país 
router.delete('/:cod_pais', async function (req, res) {
    try {
        const resultadoExclusao = await Paises.findByIdAndDelete(req.params.cod_pais);

        if (!resultadoExclusao) {
            return res.json({ message: 'País não encontrado ou já foi excluído!' });
        }
        res.json({ message: 'País eliminado!' });

    } catch (error) {
        console.error(error);
        res.json({ error: 'Erro no TRY!' });
    }
});


module.exports = router;