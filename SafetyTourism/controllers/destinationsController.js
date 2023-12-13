// IMPORTS
const Destinations = require('../models/destinations');
// IMPORT country from API1
// const Paises = require('../../API_OMS/models/paises');
const destinations = require('../models/destinations');


// POST (& save) Destination
    // this function probably doesn't work! it's just an example with probably wrong syntax
const postDestinations = function (req,res) {
    const destination = new Destinations({
        city_name: req.body.city_name,
        city_desc: req.body.city_desc,
        country_name: req.body.country_name     // fetch from database API1
    });

    destination.save(function(err) {
        if(err) {
            res.send(err),
            console.log(err);
        } else {
            res.json({ message: 'new city unlocked!' });
        }
    });
};

// GET all destinations
const getDestinations = function (req,res) {
    destinations.find(function(err, destination) {
        if(err)
            res.send(err);

        res.json(destination);
    });
};


// GET specific destination

// PUT (edit) specific destination

// DELETE specific destination
    // just for testing purposes



// EXPORT a pointer to the controller functions so we can import & point to it in the routes
exports.postDestinations = postDestinations;
exports.getDestinations = getDestinations;
// we do NOT use module.export because that is a single export syntax, and we're doing multiple exports