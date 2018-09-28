var express = require('express');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/calendar_data_store');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
    //connection complete!
    console.log('Connection has beeen successfully made');

});

var app = express();

// Our first route
app.get('/', function (req, res) {
    res.send('Hello Dev!');
});

// Listen to port 5000
app.listen(5000, function () {
    console.log('Dev app listening on port 5000!');
});