// IMPORTS
const Destinations = require('../models/destinations');
const countryController = require('./countryController');
const axios = require('axios');

// POST (& save) Destination

    // Lista de países obtida anteriormente
    let listaPaises;

countryController.getCountries({}, {
    json: function (countries) {
        listaPaises = countries;
    }
});


const postDestinations = async function (req, res) {
    try {
        if (!listaPaises) {
            return res.status(500).json({ message: "Lista de países não foi carregada." });
        }

        const countryExists = listaPaises.some(pais => pais.nome_pais === req.body.country_name);

        if (!countryExists) {
            return res.status(404).json({ message: "Este país não existe na lista de países." });
        }

        const checkCity = await Destinations.findOne({ city_name: req.body.city_name });

        if (checkCity) {
            return res.status(409).json({ message: "Essa cidade já existe!" });
        }

        const destination = new Destinations({
            city_name: req.body.city_name,
            city_desc: req.body.city_desc,
            country_name: req.body.country_name
        });

        destination.save(function (err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Erro ao guardar a cidade." });
            }
            res.json({ message: 'Nova cidade criada!' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro interno ao tentar criar a cidade." });
    }
};


// GET all destinations
const getDestinations = function (req,res) {
    Destinations.find(function(err, destination) {
        if(err)
            res.send(err);

        res.json(destination);
    });
};

// GET specific destination by name
const getDestinationByName = async function (req, res) {
    try {
        let recomendacoes = [];
        let mensagem = '';

        // Encontrar o destino pelo city_name
        const check_destination = await Destinations.findOne({ city_name:req.params.city_name}).exec();

        if (!check_destination) {
            return res.status(404).json({ message: "Cidade não encontrada!" });
        }
        
        const countryName = check_destination.country_name;
        
        // Vai buscar o país na API OMS com base no country_name do destino encontrado
        const paisResponse = await axios.get(`http://localhost:8080/api/paises/nome/${countryName}`);

        const pais = paisResponse.data;

        // Extrair o campo cod_zonageo do país encontrado
        const idZona = pais.cod_zonageo;

        // Encontrar os surtos correspondentes ao cod_zonageo
        const surtosResponse = await axios.get(`http://localhost:8080/api/surtos/zona/${idZona}`);

        const surtos = surtosResponse.data;

        if(surtos.ativos===0){ 
            mensagem = 'Não há surtos ativos para este destino. É seguro viajar.';
            //res.json({check_destination, message: 'Não há surtos ativos para este destino. É seguro viajar.' });
        } else {
            mensagem = 'Tenha atenção, existe um ou mais surto(s) ativo(s) para ' + check_destination.city_name + '.';
        }
            const codigopais = pais.cod_pais; 

            const recomendacoespais = await axios.get(`http://localhost:8080/api/paises/${codigopais}/recomendacoes`);

            recomendacoes = recomendacoespais.data;

            if(recomendacoes.validade_nota == 0){
                mensagem = 'Existem surtos ativos, mas não existe nenhuma recomendação ativa. Erro!';
              //res.json({ message: 'Existem surtos ativos, mas não existe nenhuma recomendação ativa. Erro!' });
            } 

            const packages_data = await axios.get(`http://localhost:8090/api/packages/city/${req.params.city_name}`);
            const packages = packages_data.data;

            return res.json({ 
                message: mensagem, recomendacoes, packages});
        }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro durante o processamento." });
    }
}

// GET destinations by country
const getDestinationByCountry = async function(req,res) {       // router.get('/paises/:nome_pais', 

    // fazer um get das cidades por país
    // tenho de ir à api 1 buscar os países por nome daquele que está a ser procurado no path
    // (p.ex. /Portugal deve ir buscar à API 1 o país Portugal
    // ou seja, procuro país na API1
    // depois faço um get de cidade por país
    // que seja igual ao req.params.country_name
    // sendo que country_name = API2 e nome_pais = API1
    try{

        if (!listaPaises) {
            return res.status(500).json({ message: "Lista de países não foi carregada." });
        }

        const countries = listaPaises.some(pais => pais.nome_pais === req.body.country_name);

        if (!countries) {
            return res.status(404).json({ message: "Este país não existe na lista de países." });
        }

        var cities = [];
        for(const country of countries) {
            var city = countries.nome_pais;
            if(city == null) {
                cities.push(country);
            }
        }

        if(cities.length===0) {
            res.json({message: 'cidades não encontradas para este país'});
        } else {
            res.json(cities);
        }

    } catch(error) {
        console.error(error);
        res.status(500).json({message: 'erro durante a tentativa, ' + error});
    }

};



// GET destination by id
const getDestinationById = function (req, res) {
    Destinations.findById(req.params._id, function (err, destination) {
        if (err)
            res.send(err);
        res.json(destination);
    });
};

// PUT (edit) specific destination
const updateDestination = async function (req, res) {
    try {
        const update_dest = await Destinations.findOne({city_name: req.params.city_name}).exec();
        if(!update_dest) {
            return res.json({message: "city not found"});
        }

            update_dest.city_name = req.body.city_name;
            update_dest.city_desc = req.body.city_desc;
            await update_dest.save();

        return res.json({message: "destino actualizado"});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({message: "erro no try"});
    }
};

// DELETE specific destination
    // just for testing purposes

const deleteDestination = async function (req, res) {
    try {
        var del_city = await Destinations.findOne({city_name: req.params.city_name}).exec();
        if(!del_city) {
            return res.status(404).json({message: "cidade não existe"});
        }
        const results = await Destinations.findByIdAndDelete(del_city._id);
        if (!results) {
            return res.json({message: "cidade já apagada ou nunca existiu"});
        }
        res.json({message: "deleted"});
    }
    catch (error) {
        console.error(error);
        res.json({error: "erro durante o try"});
    }
};



// EXPORT a pointer to the controller functions so we can import & point to it in the routes
module.exports= {
    postDestinations,
    getDestinations,
    getDestinationByName,
    getDestinationById,
    updateDestination,
    deleteDestination,

    getDestinationByCountry
    }
// we do NOT use module.export because that is a single export syntax, and we're doing multiple exports