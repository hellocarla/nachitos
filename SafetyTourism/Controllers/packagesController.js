// IMPORTS
const Packages = require('../models/packages');
const Destinations = require('../models/destinations');


// GET All
const getPackages = function (req, res) {
    Packages.find(function(err, packages) {
        if(err)
            res.json(err);
        
        res.json(packages);
    });
};

// GET by ID
const getPackagesById = async function (req, res) {
    Packages.findById(req.params.id, function (err, packages) {
        if (err)
            res.send(err);

        res.json(packages);
    });
}

// GET por nome do destino
const getPackagesByName = async function (req, res) {
    try {
        const new_dest = await Destinations.findOne({city_name: req.params.city}).exec();
        if(!new_dest) {
            return res.json({ message: "Cidade não encontrada."});
        }
        
        var check_packages = await Packages.find({cityId: new_dest._id}).exec();
        console.log(check_packages);
        if(check_packages == []) {
            return res.status(404).json({ message: "Não existem pacotes para este destino."});
    }
    res.json(check_packages);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro no try."})
    };
};

// POST de um Pacote
const postPackages = async function (req, res) {
    try {
    const check_city = await Destinations.findById(req.body.cityId).exec()
    if(!check_city) {
        console.log(check_city);
        return res.status(409).json({ message: "A cidade indicada não existe."})
    }
    
    var packages = Packages ({
        cityId: check_city._id,
        city: check_city.city_name,
        pack_desc: req.body.pack_desc,
        pack_price: req.body.pack_price + ' eur',
        pack_type: req.body.pack_type
    });

    packages.save(function(err) {
        if(err) {
            res.send(err),
            console.log("Erro ao guardar o pacote.");
        } else {
            res.json({ message: "Pacote criado com sucesso."});
        }
    });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro no try."});
    }
};

// PUT por ID
const updatePackages = async function (req, res) {
    try {
        
        const updatePackages = await Packages.findById(req.params.id).exec();
      
        if (!updatePackages) {
           
            return res.json({ message: "Pacote não encontrado."});
        }
        if (req.body.city) {
        
            try {
                const new_dest = await Destinations.findOne({city_name: req.body.city}).exec();
                if(!new_dest) {
                    return res.json({message: "Cidade não encontrada."});
                }
                else updatePackages.city=new_dest._id
            }
            catch (error) {
                console.error(error);
                res.json({error: "Erro durante o try para encontrar a cidade."});
            }
        }
        if (req.body.pack_desc) {
            
            updatePackages.pack_desc=req.body.pack_desc;
        }
        if (req.body.pack_price) {

            updatePackages.pack_price=req.body.pack_price  + ' eur' ;
        }
        if (req.body.pack_type) {
         
            updatePackages.pack_type=req.body.pack_type;
        }
       
        updatePackages.save(function (err) {
            if (err)
                res.send(err);
            res.json({ message: 'Pacote alterado' });
        });
        
    }
    catch (error) {
        console.error(error);
        res.json({error: "Erro durante o try."});
    }
}

// DELETE
const deletePackages = async function (req, res) {
    try {
        const del_pack = await Packages.findByIdAndDelete(req.params.id);
        if (!del_pack) {
            return res.json({message: "Pacote já apagado ou não existe."});
        }
        else res.json({message: "Pacote eliminado com sucesso!"});
    }
    catch (error) {
        console.error(error);
        res.json({error: "Erro durante o try"});
    }
};

// EXPORT a pointer to the controller functions so we can import & point to it in the routes
module.exports = {
    getPackages,
    getPackagesById,
    getPackagesByName,
    postPackages,
    updatePackages,
    deletePackages
}