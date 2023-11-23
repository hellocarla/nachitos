var express = require('express');  // call express
var Recomendacoes = require('../app/models/recomendacoes');
var Pais = require('../app/models/paises');
var Zona = require('../app/models/zona');
var router = express.Router(); // get an instance of the express Router
var mongoose = require('mongoose');

// criar um post da recomendação ( http://localhost:8082/api/recomendacoes )

router.post('/', async function(req, res) { 

    var recomendacao = new Recomendacoes();      // cria uma nova instância do modelo Recomendações 
    recomendacao.cod_recomendacao = req.body.cod_recomendacao;
    //const pais = await Pais.findOne({cod_pais: req.body.cod_pais})
    //recomendacao.cod_pais = pais._id;
    const zona = await Zona.findOne({cod_zonageo: req.body.cod_zonageo})
    recomendacao.cod_zonageo = zona._id;
    recomendacao.data_nota = req.body.data_nota;
    recomendacao.validade_nota = req.body.validade_nota;
    recomendacao.recomendacao_texto = req.body.recomendacao_texto; 

    // salva a recomendação e faz check dos erros
    recomendacao.save(function(err) {
        if (err)
            res.send(err); 

        res.json({ message: 'Recomendação criada!' });
    });
});


// Vai buscar todas as recomendações ( http://localhost:8082/api/recomendacoes )
router.get('/',function(_req, res) {
    Recomendacoes.find(function(err, recomendacoes) {
        if (err)
            res.send(err);

            res.json(recomendacoes);
        });
    });


// Função para renovar a validade
function renovarValidade(dataAtual, diasParaAdicionar) {
    var dataAtualObj = new Date(dataAtual);
    dataAtualObj.setDate(dataAtualObj.getDate() + diasParaAdicionar);
    var novaData = dataAtualObj.toISOString().split('T')[0];
    return novaData;
}



router.put('/:cod_recomendacao', async function (req, res) {
    try {
        // Encontra a recomendação pelo ID
        const recomendacao = await Recomendacoes.findOne({cod_recomendacao: req.params.cod_recomendacao});

      
        if (!recomendacao) {
            return res.json({ message: 'Recomendação não encontrada!' });
        }

        // Atualiza os campos da recomendação com base nos dados da solicitação
        //recomendacao.cod_recomendacao = recomendacao.cod_recomendacao;
        recomendacao.data_nota = req.body.data_nota;
        recomendacao.recomendacao_texto = req.body.recomendacao_texto;

        // Renova a validade usando a função renovarValidade
        recomendacao.validade_nota = req.body.validade_nota;

        // Salva a recomendação
        /*await*/ recomendacao.save();

        res.json({ message: 'Código de recomendação editado!' });
    } catch (error) {
        console.error(error);
        res.json({ error: 'Erro no TRY' });
    }
});

/* É SÓ PARA TESTES
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
*/
module.exports = router;
