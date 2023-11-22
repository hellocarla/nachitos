var express = require('express'); 
var Paises = require('../app/models/paises');
var Zona = require('../app/models/zona');
var Recomendacoes = require('../app/models/recomendacoes');
var Surtos = require('../app/models/surtos');
var router = express.Router();


//POST http://localhost:8082/api/paises
router.post('/', function (req, res) {
    var paises = new Paises();      // create a new instance of the Paises model
    paises.nome_pais = req.body.nome_pais;  // set the paises name (comes from the request)
    paises.cod_pais = req.body.cod_pais;
    paises.cod_zonageo = req.body.cod_zonageo;

    // save the país and check for errors
    paises.save(function (err) {
        if (err)
            res.send(err);
        res.json({ message: 'País criado!' });
    });
});

// Obter/Pesquisar todos os países (accessed at GET http://localhost:8082/api/paises)
router.get('/', function (req, res) {
    Paises.find(function (err, paises) {
        if (err){
            res.send(err);
        } else {
             res.json(paises);
        }
            
       
    });
});

// Get recomendações pelo código do país
router.get('/:cod_pais/recomendacoes', async function (req, res) {
    //const pais = await Paises.findOne({cod_pais: req.params.cod_pais}).populate('zona').exec();
    const pais = await Paises.findOne({cod_pais: req.params.cod_pais}).exec();
    console.log(pais, "ola");
    const zona = await Zona.findById(pais.cod_zonageo).exec();
    console.log(zona);
    var recs = await Recomendacoes.find({cod_zonageo:zona._id}).exec();
    console.log(recs, "depois das recs");
    var objetos = [];
    console.log(objetos, "cucu");
    for (const recomendacao of recs) {
        var fimRecomendacoes = new Date (recomendacao.validade_nota);
        console.log(fimRecomendacoes, "tete");
        //fimRecomendacoes.setDate(fimRecomendacoes.getDate() + recomendacao.validade_nota);
        var hoje = new Date();
        if(fimRecomendacoes>=hoje){
            objetos.push(recomendacao);
        }
    }
    res.json(objetos);
});

//GET surtos ativos
router.get('/:cod_pais/surtos', async function (req, res) {
    //const pais = await Paises.findOne({cod_pais: req.params.cod_pais}).populate('zona').exec();
    const pais = await Paises.findOne({cod_pais: req.params.cod_pais}).exec();
    const zona = await Zona.findById(pais.cod_zonageo).exec();
    var surtos = await Surtos.find({cod_zonageo:zona._id}).exec();
    var objetos = [];

    for (const surto of surtos) {
        var fimSurto = surto.data_fim;
        if(fimSurto==null){
            objetos.push(surto);
        }
    }
    res.json(objetos);
});

/*for (const recomendacao of recs) {
    var fimRecomendacoes = new Date (recomendacao.data_nota);
    //fimRecomendacoes.setDate(fimRecomendacoes.getDate() + recomendacao.validade_nota);
    var hoje = new Date();
    if(fimRecomendacoes>=hoje){
        var objeto = {
            codigo:recomendacao.cod_recomendacao,
            data: recomendacao.data_nota,
            validade: recomendacao.validade_nota
        };
        const zona = await Zona.findById(recomendacao.zona).exec();

        if(zona){
            objeto.zona = zona.cod_zonageo;
        }
        objetos.push(objeto);
    }
}
*/

    /*
//Pesquisar recomendacoes pelo código do país (accessed at GET http://localhost:8081/api/paises/:cod_pais)
router.get('/:cod_pais/recomendacoes',function (req, res) {
    Paises.findById(req.params.cod_pais, async function (err, paises) {
        if (err)
            res.send(err);
        res.json(paises);        
    });
    var p = find({cod_pais});
    var z = p.cod_zonageo;
    var recs = find (zona.z);
    console.log(recs);
});


router.get('/:cod_pais/', async function (req, res) {
    try{
        const pais = await Paises.find().exec();
        if (pais){
            var pais = [];
            for(const paises of pais){
                const recs = await Recomendacoes.findById(recomedacoes.cod_zonageo).exec();
                if(recs){
                    var carro = new Object();
                    carro.matricula = car.matricula;
                    carro.dataRegisto = car.dataRegisto;
                    carro.dono = dono;
                    carros.push(carro);
                }
            }
        
        res.json(carros);
        }
    } catch (err){
        res.send(err);
    }
    
});
//Pesquisar re

*/

// Pesquisar recomendações pelo código do país (accessed at GET http://localhost:8081/api/paises/:cod_pais)
/*Ir primeiro buscar cod zona
router.get('/:cod_pais/recomendacoes',function (req, res) {
    Paises.findById(req.params.cod_pais, function (err, recs) {
        var p = find({cod_pais});
        var z = p.zona;
        var recs = find (zona.z);  
        if (err)
            res.send(err);
        res.json(recs);
    });  
});
*/

module.exports = router;