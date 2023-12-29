//IMPORT country from API1
var APIligacao = require('node-rest-client').Client;
var APIaddress = "http://localhost:8080/api/paises";


const getCountries = function (req, res) {
    var paises = new APIligacao();
    paises.get(APIaddress, function(dados, response) {
        const countries = dados.map(element => ({
            cod_pais: element.cod_pais,
            nome_pais: element.nome_pais
        }));
        res.json(countries);
});
};


module.exports = {
    getCountries
}
