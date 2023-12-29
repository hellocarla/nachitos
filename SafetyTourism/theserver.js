// SETUP
    // dependencies
var express  = require('express');
var app = express();
var bodyParser = require('body-parser');

// MONGOOSE
var mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://pimpim:OCgI7DrXl8fjBqVF@cluster0.1tlphoo.mongodb.net/?retryWrites=true&w=majority')


//Usar JSON
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// PORT
var port = process.env.port || 8090;       



// IMPORTS, DEPENDENCIES
const sqlite3 = require('sqlite3').verbose();


// CONNECT to database
const db = new sqlite3.Database('./userDB.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,(err) => {
    if(err)
        return console.error(err.message);      // catching an error
});

// CREATE database
 var sqlCreate = `CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, 
                user_name TEXT UNIQUE NOT NULL, 
                user_email TEXT UNIQUE NOT NULL,
                user_pw TEXT NOT NULL, 
                user_type TEXT CHECK(user_type IN ('client', 'admin', 'func')) DEFAULT 'client', 
                user_NIF INTEGER UNIQUE DEFAULT NULL, 
                user_address TEXT DEFAULT NULL, 
                user_phonenumber INTEGER DEFAULT NULL)`;
     db.run(sqlCreate);


// API routes go here
var destinosRoutes = require('./routes/destinationsRoutes');
app.use('/api/destinations', destinosRoutes);

var reservasRoutes = require('./routes/reservationsRoutes');
app.use('/api/reservations', reservasRoutes);

var pacotesRoutes = require('./routes/packagesRoutes');
app.use('/api/packages', pacotesRoutes);

var usersRoutes = require('./routes/usersRoutes');
app.use('/api/users', usersRoutes);

var countryRoutes = require('./routes/countryRoutes');
app.use('/api/country', countryRoutes);

var RegUserRoutes = require('./routes/RegUserRoutes');
app.use('/api/sql', RegUserRoutes);

var loginRoutes = require('./routes/loginRoutes');
app.use('/api/login', loginRoutes);

//Server
app.listen(8090, () => {
    console.log("This bitch be running like " + port + " hogs");
});

