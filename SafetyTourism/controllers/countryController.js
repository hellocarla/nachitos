//IMPORT country from API1
var APIligacao = require('node-rest-client').Client;
var APIaddress = "http://localhost:8080/api/paises";

//GET info from API OMS
/*
const getCountries = function (req,res) {
    var paises = new APIligacao();
    paises.get(APIaddress, function(dados, res) {
    for(let index=0; index<dados.length; index++){
        const element = dados[index];
        console.log(index+1);
        console.log(element.cod_pais);
        console.log(element.nome_pais);
        }
        res.json(element.nome_pais);
    });
    res.send(paises);
}
*/

const getCountries = function (req, res) {
    var paises = new APIligacao();
    paises.get(APIaddress, function(dados, response) {
        const countries = dados.map(element => ({
            cod_pais: element.cod_pais,
            nome_pais: element.nome_pais
        }));

        console.log(countries);

        res.json(countries);
});
};


module.exports = {
    getCountries
}
