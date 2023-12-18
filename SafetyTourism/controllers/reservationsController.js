// IMPORTS
const reservations = require('../models/reservations');
const Reservations = require('../models/reservations');
// IMPORT users
const Users = require('../models/users');
// IMPORT packages
const Packages = require('../models/packages');

// POST (& save) Reservation http://localhost:8090/api/reservations
/*const postReservations =  async function (req,res) {
    try {
    var reservation = new Reservations({
        res_client: req.body.res_client,
        res_package: req.body.res_package          
    });

    reservation.save(function(err) {
        if(err) {
            res.send(err),
            console.log("erro ao guardar a reserva");
        } else {
            res.json({ message: 'nova reserva registada' });
        }
    });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({message: "erro do try"});
    }
};
*/

const postReservations =  async function (req,res) {
try {
    var check_client = await Users.findOne({_id: req.body.res_client})
    
    //Se o cliente não existir, envia uma resposta a indicar que não foi encontrado
    if(!check_client) {
        return res.status(404).json({message: "Esse cliente não existe!"})
    }

    const check_package = await Packages.findOne({_id: req.body.res_package})
    //Se o pacote não existir, envia uma resposta a indicar que não foi encontrado
    if(!check_package) {
        return res.status(404).json({message: "Esse pacote de viagem não existe!"})
    }

    var reservation = new Reservations ();
    reservation.res_client = check_client.user_name;
    reservation.res_package = check_package.pack_type;

reservation.save(function(err) {
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


// GET all reservations
const getReservations = function (req,res) {
    Reservations.find(function(err, reservation) {
        if(err)
            res.send(err);

        res.json(reservation);
    });
};

// GET reservation by ID 
const getReservationById = async function (req, res) {
    try{
        const check_getResId = await Reservations.findById(req.params._id).exec();
        if(!check_getResId) {
            return res.status(404).json({message: "Reserva não existe!"})
        }
        res.json(check_getResId);
    }
    catch (error) {
        console.error(error);
           res.status(500).json({message: "erro no try"});
    }
};


// GET reservation by client ID 
const getReservationByClient = async function (req,res) {
    try {
        const check_client = await Reservations.find({res_client: req.params.res_client}).exec();
        if(!check_client) {
            return res.status(404).json({message: "Cliente não existe!"})
        }
        res.json(check_client);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({message: "erro durante o try"});
    }
};


// UPDATE reservation by ID
const updateReservationById = async function (req,res) {
    try {
        const update_reservation = await Reservations.findById(req.params._id).exec();
        if(!update_reservation) {
            return res.json({message: "Reserva não encontrada!"});
        }

        update_reservation.res_client = req.body.res_client;
        update_reservation.res_package = req.body.res_package;
            await update_reservation.save();

        return res.json({message: "Reserva actualizada!"});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({message: "erro no try"});
    }
};

// DELETE a reservation by ID
const deleteReservationById = async function (req, res) {
    try {
        const del_reserva = await Reservations.findById(req.params._id).exec();
        if(!del_reserva) {
            return res.status(404).json({message: "Reserva não existe"});
        }
        const results = await Reservations.findByIdAndDelete(del_reserva._id);
        if (!results) {
            return res.json({message: "Reserva já apagada ou nunca existiu"});
        }
        res.json({message: "Reserva apagada"});
    }
    catch (error) {
        console.error(error);
        res.json({error: "erro durante o try"});
    }
};


// EXPORT a pointer to the controller functions so we can import & point to it in the routes
module.exports= {
    postReservations,
    getReservations,
    getReservationById,
    getReservationByClient,
    updateReservationById,
    deleteReservationById
    }
