const express = require('express');
const mongoose = require('mongoose');
const UserRouter = require('./routers/User.js');
const bodyParser = require('body-parser');


mongoose.connect('mongodb://localhost/calendar_data_store');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('Connection has beeen successfully made'));

const app = express();

// Our first route
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
UserRouter(app);

app.use('/', (req, res) => res.send('Invalid Route'));
// Listen to port 5000
app.listen(5000, () => console.log('Dev app listening on port 5000!'));