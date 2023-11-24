var express = require('express');
var Zona = require('../app/models/zona');
var router = express.Router();

// on routes that end with /zona
// ou seja, todos os caminhos que passarem pelo model/zona

// POST http://localhost:8082/api/zona
router.post('/', function (req, res) {
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

});


// GET das zonas

router.get('/', function(_req,res) {
    Zona.find(function(err, zona) {
        if(err)
            res.send(err);

        res.json(zona);
    });
});


module.exports=router;