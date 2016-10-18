// BASE SETUP

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// Global variable
package = require('./package.json');
config = package.config;

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json());

app.use('/', require('./MainRouter'));

// START THE SERVER
app.listen(package.port);
console.log( package.description + ' started on port ' + package.port);

