'use strict';

var express = require('express'),
    app = express(),
    port = process.env.PORT || 5000,
    mongoose = require('mongoose'),
    bodyparser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs'),
    User = require('./api/models/user'),
    Question = require('./api/models/question'),
    Answer = require('./api/models/answer'),
    authRoutes = require('./api/routes/userRoutes'),
    questionRoutes = require('./api/routes/questionRoutes'),
    answerRoutes = require('./api/routes/answerRoutes'),
    config = require('./config');

mongoose.Promise = global.Promise;
var option = {
    keepAlive: 300000,
    connectTimeoutMS: 30000
};

var db = config.db;

mongoose.connect(db, option).then(function(){
    console.log(`Connected to database`);
},
function(err){
    console.log(err)
});

app.set('crypt', config.crpyt);
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(bodyparser.raw())
app.use(bodyparser.text())

app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);

    if('OPTIONS' === req.method){
        res.send(200);
    }

    next();
});

authRoutes(app);
questionRoutes(app);
answerRoutes(app);

app.get('/', function(req, res){
    res.status(200);
    res.json({ message: 'AskBHU endpoint' });
});

app.use(function(req, res){
    res.status(404).send({ 404: req.originalUrl + ' not found!'});
});

app.listen(port);

console.log(`Server started on ${port}`);

module.exports = app;