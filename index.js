const express = require('express');
const mongoose = require('mongoose');
const UserRouter = require('./routers/User.js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const mongoStore = require('connect-mongo')(session);


mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/calendar_data_store', {useNewUrlParser:true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('Connection has beeen successfully made'));

const app = express();


// Our first route
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(UserRouter);
app.use(cookieParser());
app.use(session({
    secret: 'mysecretsessionkey',
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({mongooseConnection: mongoose.connection})
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', (req, res) => res.send('Invalid Route'));
// Listen to port 5000
app.listen(5000, () => console.log('Dev app listening on port 5000!'));