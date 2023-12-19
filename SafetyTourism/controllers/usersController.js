// IMPORTS
const Users = require('../models/users');

// POST A USER (register)
const createUser = async function (req,res) {
    try {
        const check_user = await Users.findOne({user_email: req.body.user_email}).exec();
    if(check_user) {
        return res.status(409).json({message: "that e-mail is taken bestie"})
    }

    var user = new Users({
        userId: req.body.userId,
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_pw: req.body.user_pw
    });

    user.save(function(err) {
        if(err) {
            res.send(err),
            console.log("error saving user. you can't save them all </3");
        } else {
            res.json({message: "you made a new friend!"});
        }
    });
    }
    catch (error) {
        console.error(error);
       res.status(500).json({message: "error during try. get better lol"}); 
    }
};

// GET ALL
const getUsers = function (req,res) {
    Users.find(function(err,users) {
        if(err)
            res.send(err);

        res.json(users);
    });
};

// GET user by id
const getUserById = function (req,res) {
    Users.findById(req.params._id, function(err, thisguy) {
        if(err)
            res.send(err);
        res.json(thisguy);
    });
};

// GET user by code
const getUserByCode = function (req,res) {
    Users.findOne(req.params.userId, function(err, thisguy) {
        if(err)
            res.send(err);
        res.json(thisguy);
    });
};

// GET user by name
const getUserByName = async function (req,res) {
    try {
        const check_name = await Users.findOne({user_name: req.body.user_name}).exec();
        if(!check_name) {
            return res.status(404).json({message: "wrong name buddy"});
        }
        res.json(check_name);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({message: "try error"});
    }
}

// UPDATE user
// needs to be changed to PATCH instead
const updateUser = async function (req,res) {
    try {
        const update_user = await Users.findById(req.params.userId).exec();
        if(!update_user) {
            return res.json({message: "user not found, search better"});
        }

            update_user.user_name = req.body.user_name;
            update_user.user_email = req.body.user_email;
            update_user.user_pw = req.body.user_pw;
            update_user.user_address = req.body.user_address;
            update_user.user_postal = req.body.user_postal;
            update_user.user_phone = req.body.user_phone;
            update_user.user_nif = req.body.user_nif;

            await update_user.save();

        return res.json({message: "updated user v2.0"});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({message: "error for trying too hard, be chill"});
    }
};

// DELETE user
const deleteUser = async function(req,res) {
    try {
        var delete_user = await Users.findById({userId: req.params.userId}).exec();
        if(!delete_user) {
            return res.status(404).json({message: "user isn't real. this is all a simulation."});
        }
        const results = await Users.findByIdAndDelete(delete_user.userId);

        if(!results) {
            return res.json({message: "deleted user (or they never existed...)"});
        }
        res.json({message: "GONE!"});
    }
    catch (error) {
        console.error(error);
        res.json({error: "error while trying to delete user"});
    }
};

// EXPORTS
module.exports= {
    createUser,
    getUsers,
    getUserById,
    getUserByCode,
    getUserByName,
    updateUser,
    deleteUser
}