// SETUP
    // dependencies
var express  = require('express');
var app = express();
var bodyParser = require('body-parser');

// ##### NO MONGOOSE YET #####
var mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://pimpim:fadadosdentes@cluster0.1tlphoo.mongodb.net/?retryWrites=true&w=majority')
//mongoose.connect('mongodb+srv://inesdejesusfernandes0:lulupomerania@cluster0.ieqnyka.mongodb.net/oms?retryWrites=true&w=majority');

//Usar JSON
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// PORT
var port = process.env.port || 8090;        // <-- let's change ports to a common unnocupied one so we don't keep changing (api 1 as well)


// something goes here...


// API routes go here...
var destinosRoutes = require('./routes/destinationsRoutes');
app.use('/api/destinations', destinosRoutes);



// START
    // there's a better way to do this, find it
    /*
app.listen(port);
console.log('Open the gates: ' + port);
*/


app.listen(8090, () => {
    console.log("This bitch be running like " + port + " hogs");
});

