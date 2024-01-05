// IMPORTS
const Reservations = require('../models/reservations');

// IMPORT users
//const Users = require('../models/users');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./userDB.db');

// IMPORT packages
const Packages = require('../models/packages');

// POST reservation 
const postReservations =  async function (req,res) {
    try {
    //const id = req.body.res_clientId; 
    const { res_clientId, res_packageId } = req.body;

    const result = await new Promise((resolve,reject) => {
        db.get('SELECT * FROM users WHERE id = ?', [res_clientId], (error,row) => {
            if (error) {
                console.error(error.message);
                reject({ error: 'Internal server error' });
            }
            if (!row) {
                reject({ error: 'User not found' });
            } else { 
                if(row.user_address==null || row.user_NIF==null ||row.user_phonenumber==null){
                    reject({message: "Preencha os campos em falta, nabiça!"})
                } else {
                    resolve(row);
                }
            }
        })
    });
    
    const check_package = await Packages.findOne({_id: req.body.res_packageId})
    //Se o pacote não existir, envia uma resposta a indicar que não foi encontrado
    if(!check_package) {
        return res.status(404).json({message: "Este pacote de viagem não existe!"})
    }

    var reservation = new Reservations ();
    reservation.res_clientId = result.id
    reservation.res_client = result.user_name;
    reservation.res_city = check_package.city;
    reservation.res_packageId = check_package._id;
    reservation.res_package = check_package.pack_type;

reservation.save(function(err) {
    if(err) {
        res.send(err),
        console.log("erro ao guardar a reserva");
    } else {
        res.json({ message: 'Nova reserva criada!' });
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

//GET reservation by ID 
const getReservationById = async function (req, res) {
    try{
        const check_getResId = await Reservations.findById(req.params._id).exec();
        if(!check_getResId) {
            return res.status(404).json({message: "Reserva não existe!"})
        }
        if (req.user.userRole == "client" && check_getResId.res_clientId !== req.user.userid) {
            return res.status(403).json({ error: 'User is not authorized' });
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
        const reserva_clientId = parseInt(req.params.res_clientId);
        const check_client = await Reservations.findOne({ reserva_clientId }).exec();
        if(!check_client) {
            return res.status(404).json({message: "Cliente não existe!"})
        }
        if (req.user.userRole == "client" && check_client.res_clientId !== req.user.userid) {
            return res.status(403).json({ error: 'User is not authorized' });
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
        const { res_clientId, res_packageId } = req.body;
        if ((req.user.userRole == "client" && update_reservation.res_clientId == req.user.userid && res_clientId == req.user.userid) || req.user.userRole == "func" || req.user.userRole == "admin") {
            const check_cliente = await new Promise((resolve,reject) => {
                db.get('SELECT * FROM users WHERE id = ?', [res_clientId], (error,row) => {
                    if (error) {
                        console.error(error.message);
                        reject({ error: 'Internal server error' });
                    }
                    if (!row) {
                        reject({ error: 'User not found' });
                    } else { 
                        if(row.user_address==null || row.user_NIF==null ||row.user_phonenumber==null){
                            reject({message: "Preencha os campos em falta, nabiça!"})
                        } else {
                            resolve(row);
                        }
                    }
                })
            })
            update_reservation.res_clientId = check_cliente.id;
            update_reservation.res_client = check_cliente.user_name
            const check_package = await Packages.findOne({_id: res_packageId})
            if(!check_package) {
                return res.status(404).json({message: "Este pacote de viagem não existe!"})
            }
            update_reservation.res_packageId = check_package._id;
            update_reservation.res_city = check_package.city;
            update_reservation.res_package = check_package.pack_type;
                await update_reservation.save();
            return res.json({message: "Reserva actualizada!"});
        } else {
            return res.status(403).json({ error: 'User not authorized' });
        }
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
