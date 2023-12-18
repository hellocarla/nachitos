// SETUP
    // dependencies
var express  = require('express');
var app = express();
var bodyParser = require('body-parser');

// ##### NO MONGOOSE YET #####
var mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://pimpim:OCgI7DrXl8fjBqVF@cluster0.1tlphoo.mongodb.net/?retryWrites=true&w=majority')


//Usar JSON
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// PORT
var port = process.env.port || 8090;        // <-- let's change ports to a common unnocupied one so we don't keep changing (api 1 as well)


// something goes here...


// API routes go here...
var destinosRoutes = require('./routes/destinationsRoutes');
app.use('/api/destinations', destinosRoutes);

var reservasRoutes = require('./routes/reservationsRoutes');
app.use('/api/reservations', reservasRoutes);

var pacotesRoutes = require('./routes/packagesRoutes');
app.use('/api/packages', pacotesRoutes);

//Server
app.listen(8090, () => {
    console.log("This bitch be running like " + port + " hogs");
});

