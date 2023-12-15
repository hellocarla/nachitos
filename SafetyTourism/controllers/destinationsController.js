// IMPORTS
const destinations = require('../models/destinations');
const Destinations = require('../models/destinations');
// IMPORT country from API1
// const Paises = require('../../API_OMS/models/paises');


// POST (& save) Destination
    // this function probably doesn't work! it's just an example with probably wrong syntax
const postDestinations =  async function (req,res) {
    try {
    const check_city = await Destinations.findOne({city_name: req.body.city_name})
    if(check_city) {
        return res.status(409).json({message: "Essa cidade já existe!"})
    }

    var destination = new Destinations({
        city_name: req.body.city_name,
        city_desc: req.body.city_desc,
        country_name: req.body.country_name     // fetch from database API1
    });

    destination.save(function(err) {
        if(err) {
            res.send(err),
            console.log("erro ao guardar a cidade");
        } else {
            res.json({ message: 'new city unlocked!' });
        }
    });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({message: "erro do try"});
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
const getDestinationByName = async function (req,res) {
    try {
        const check_destination = await Destinations.findOne({city_name: req.params.city_name}).exec();
        if(!check_destination) {
            return res.status(404).json({message: "city does not exist!"})
        }
        res.json(check_destination);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({message: "erro durante o try"});
    }

}

// GET destination by id

const getDestinationById = function (req, res) {
    Destinations.findById(req.params._id, function (err, destination) {
        console.log("hey " + req.params._id);
        if (err)
            res.send(err);
        res.json(destination);
    });
};


/*
const getDestinationById = async function (req, res) {
    try {
        var dest_id = await Destinations.findOne({city_name: req.params.city_name}).exec();
        if(!dest_id) {
            return res.status(404).json({message: "cidade não existe"});
        }
        const results = await Destinations.findById(dest_id._id);
        if (!results) {
            return res.json({message: "cidade já buscada ou nunca existiu"});
        }
        res.json({message: "yoinked"});
    }
    catch (error) {
        console.error(error);
        res.json({error: "erro durante o try -- get by id"});
    }
};
*/




/*
const getDestinationById = async function (req,res) {
    try {
        var check_destinationById = await Destinations.getElementById(req.params._id).exec();
        console.log("cidade " + _id);
        if(!check_destinationById) {
            return res.status(404).json({message: "city does not exist!"})
        }
        res.json(check_destinationById);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({message: "erro durante o try"});
    }
}
*/

// PUT (edit) specific destination
const updateDestination = async function (req,res) {
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
        // console.log("hello id " + _id)
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
    deleteDestination
    }
// we do NOT use module.export because that is a single export syntax, and we're doing multiple exports