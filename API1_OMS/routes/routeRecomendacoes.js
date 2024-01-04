var express = require('express');  // call express
var Recomendacoes = require('../app/models/recomendacoes');
var Pais = require('../app/models/paises');
var Zona = require('../app/models/zona');
var Surtos = require('../app/models/surtos');
var Virus = require('../app/models/virus');
var router = express.Router(); // get an instance of the express Router
var mongoose = require('mongoose');

// TO DO - POST não pode aceitar preenchimento vazio " " na "recomendacao_texto".
//Quando fazemos um POST com cod_recomendacao a vazio " " aparece um erro muito longo, poderia aparecer por exemplo "Tem de preencher todos os campos."


// criar um post da recomendação ( http://localhost:8082/api/recomendacoes )
router.post('/', async function(req, res) { 
try{
    const check_recomendacao = await Recomendacoes.findOne({cod_recomendacao: req.body.cod_recomendacao})
    if (check_recomendacao) {
        return res.status(409).json({ message: 'A recomendação com o código ' + req.body.cod_recomendacao + ' já existe!' });
    }
    var recomendacao = new Recomendacoes();      // cria uma nova instância do modelo Recomendações 
    recomendacao.cod_recomendacao = req.body.cod_recomendacao;
    
    const zona = await Zona.findOne({cod_zonageo: req.body.cod_zonageo})
    if (!zona) {
        return res.status(404).json({ message: 'Zona geográfica com o código ' + req.body.cod_zonageo + ' não encontrada, pais não criado!' });
    }
    
    recomendacao.cod_zonageo = zona._id;

    const surto = await Surtos.findOne({cod_surto:req.body.cod_surto}); // Encontra o surto correspondente
    if (!surto) {
        return res.status(404).json({ message: 'O surto com o código ' + req.body.cod_surto + ' não foi encontrado!' });
    }
    
    recomendacao.cod_surto = surto._id;
/*
    virus_menos = surto.cod_virus;
    const virus_mais = await Virus.findOne(virus_menos).exec();
    recomendacao.cod_virus = virus_mais._id;
*/
/*
    const virus = await Virus.findOne({cod_virus:req.body.cod_virus}); // Encontra o virus correspondente
    console.log(cod_virus, 'entrou no findOne');

    if (!virus) {
        return res.status(404).json({ message: 'O virus com o código ' + req.body.cod_virus + ' não foi encontrado!' });
    }

    recomendacao.cod_virus = virus._id;
    console.log(virus.cod_virus, virus._id, 'inseriu o cod_virus');
*/
    recomendacao.data_nota = req.body.data_nota;
    recomendacao.validade_nota = req.body.validade_nota;
    recomendacao.recomendacao_texto = req.body.recomendacao_texto; 

    // salva a recomendação e faz check dos erros
    recomendacao.save(function(err) {
        if (err)
            res.send(err); 

        res.json({ message: 'Recomendação criada!' });
    });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no TRY!' });
    }
});

// Get de todas as recomendações ( http://localhost:8082/api/recomendacoes )
router.get('/all',function(_req, res) {
    Recomendacoes.find(function(err, recomendacoes) {
        if (err)
            res.send(err);

            res.json(recomendacoes);
        });
    });


// GET de todas as recs com objecto ZONA e SURTO
/*
    router.get('/', async function (req,res) {
        try {
            const recs = await Recomendacoes.find().exec();
            if(recs) {
                var todas_recs = [];
                for (const rec of recs) {
                    const zona_mae = await Zona.findById(rec.cod_zonageo).exec();
                    const surto_pai = await Surtos.findById(rec.cod_surto).exec(); 
                    if(zona_mae && surto_pai) {
                        var rec_nova = new Object();
                        rec_nova._id = rec._id;
                        rec_nova.cod_recomendacao = rec.cod_recomendacao;
                        rec_nova.validade_nota = rec.validade_nota;
                        rec_nova.cod_zonageo = zona_mae;
                        rec_nova.cod_surto = surto_pai;
                        rec_nova.data_nota = rec.data_nota;
                        rec_nova.recomendacao_texto = rec.recomendacao_texto;
                        todas_recs.push(rec_nova);
                    }
                }
    
                res.json(todas_recs);
            }
        } catch (err) {
            res.send(err);
        }
    });

*/



// GET de todas as recs com objecto ZONA e SURTO com objecto VIRUS dentro do surto
router.get('/', async function (req,res) {
    try {
        const recs = await Recomendacoes.find().exec();
        if(recs) {
            var todas_recs = [];
            for (const rec of recs) {
                const zona_mae = await Zona.findById(rec.cod_zonageo).exec();
                const surto_pai = await Surtos.findById(rec.cod_surto).exec();
                //const virus_filho = await Virus.findById(rec.cod_virus).exec();

                if(zona_mae && surto_pai) {
/*
                    for (const campos of surto_pai) {
                        if (typeof surto_pai[campos] === "object") {
                            for (let ninho in surto_pai[campos]) {
                                console.log(surto_pai[campos][ninho]);
                            }
                        } else {
                            console.log(surto_pai[campos]);
                        }
                    }
*/
                    var rec_nova = new Object();
                    rec_nova._id = rec._id;
                    rec_nova.cod_recomendacao = rec.cod_recomendacao;
                    rec_nova.validade_nota = rec.validade_nota;
                    rec_nova.cod_zonageo = zona_mae;
                    rec_nova.cod_surto = surto_pai;
                    //console.log(surto_pai.cod_virus);
                    //console.log(surto_pai[campos][ninho])
                    //rec_nova.cod_virus = rec.cod_virus;
                    rec_nova.data_nota = rec.data_nota;
                    rec_nova.recomendacao_texto = rec.recomendacao_texto;
                    todas_recs.push(rec_nova);
                }
            }

            res.json(todas_recs);
        }
    } catch (err) {
        res.send(err);
    }
});







// Get de uma recomendação pelo código de recomendação
router.get('/:cod_recomendacao', async function(req, res) {
    try{
        const recomendacao = await Recomendacoes.findOne({cod_recomendacao: req.params.cod_recomendacao});
        if (!recomendacao) {
            return res.status(404).json({ message: 'A recomendacao com o código ' + req.params.cod_recomendacao + ' não existe!' });
        }
        res.json(recomendacao);
    }  
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no TRY!' });
    }
});

router.put('/:cod_recomendacao', async function (req, res) {
try {
    // Encontra a recomendação pelo ID
    const recomendacao = await Recomendacoes.findOne({cod_recomendacao: req.params.cod_recomendacao});
 
    if (!recomendacao) {
        return res.json({ message: 'Recomendação não encontrada!' });
    }

    recomendacao.data_nota = req.body.data_nota;
    recomendacao.recomendacao_texto = req.body.recomendacao_texto;

    // Renova a validade usando a função renovarValidade
    recomendacao.validade_nota = req.body.validade_nota;

    // Salva a recomendação
        recomendacao.save();

        res.json({ message: 'Código de recomendação editado!' });
    } 

    //TO DO quando fazemos o put se não colocarmos os 3 campos continua a aparecer a msg 'Código de recomendação editado!'.
    //Temos de alterar para que apareça uma msg a dizer os campos obrigatórios.
    
catch (error) {
    console.error(error);
    res.json({ error: 'Erro no TRY' });
    }
});


// Delete de uma recomendação pelo código de recomendação
router.delete('/:cod_recomendacao', async function (req, res) {
    try {
        const resultadoExclusao = await Recomendacoes.findByIdAndDelete(req.params.cod_recomendacao);

        if (!resultadoExclusao) {
            return res.json({ message: 'Recomendação não encontrada ou já foi excluída!' });
        }
        res.json({ message: 'Recomendação eliminada!' });

    } catch (error) {
        console.error(error);
        res.json({ error: 'Erro no TRY!' });
    }
});

module.exports = router;
