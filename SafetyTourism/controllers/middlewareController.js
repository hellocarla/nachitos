const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const keyFile = require('../secret.key');

const clientvalidateToken = asyncHandler(async (req, res, next) =>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, keyFile.securekey, (err, decoded) => {
            if(err) {
                return res.status(401).json({ error: "User is not authorized!"});                 
            }

            const userType =decoded.userRole;
            
            if(userType !== 'func') {
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
})


/*const jwt = require('jsonwebtoken');
const keyFile = require('../secret.key');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization; // Obtenha o token do cabeçalho Authorization

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, keyFile.securekey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    const userType = decoded.user_type; // Se você estiver incluindo o user_type no token

    if (userType !== 'func' && userType !== 'admin') {
      return res.status(403).json({ message: 'Permissão negada' });
    }

    // Se o usuário tiver o tipo correto, você pode prosseguir
    req.user = decoded;
    next(); // Continue para a próxima função de middleware ou rota
  });
};
*/
module.exports= clientvalidateToken;

