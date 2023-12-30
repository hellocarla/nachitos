const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const keyFile = require('../secret.key');


const adminTokenValidation = asyncHandler(async (req, res, next) =>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, keyFile.securekey, (err, decoded) => {
            if(err) {
                return res.status(401).json({ error: "User is not authorized!"});                 
            }

            const userType =decoded.userRole;
            
            if(userType !== 'admin') {
                return res.status(403).json({ message: 'Permissão negada' });
            }
            req.user = decoded;
            next();
        })
        /*
        if(!token){
            return res.status(401).json({"User is not authorized or token is missing!"});
        }
        */
    }
});

module.exports= adminTokenValidation;