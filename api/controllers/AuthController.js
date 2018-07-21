'use strict';

var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs'),
    config = require('../../config'),
    User = mongoose.model('User');

exports.signup = function(req, res){
    if(!req.body.email || !req.body.password || !req.body.name){
        res.status(500);
        res.json({ message: 'provide all fields!'});
    }
    else{
        var password = bcrypt.hashSync(req.body.password, 8);
        var user = new User({
            username: req.body.email,
            email: req.body.email,
            name: req.body.name,
            password: password
        });
        user.save(function(err, user){
            if(err){
                res.status(500);
                res.send(err);
            }
            else{
                res.status(201);
                res.json({ data: user.username, message: 'User created. Authenticate to get token'});
            }
        });
    }
}

exports.authenticate = function(req, res){
    if(!req.body.username && req.body.password){
        res.status(500);
        res.json({ message: 'username not provided'});
    }
    else if(!req.body.password && req.body.username){
        res.status(500);
        res.json({ message: 'password not provided'});
    }
    else if(!req.body.password && !req.body.username){
        res.status(500);
        res.json({ message: 'username and password not provided'});
    }
    else{
        User.findOne({
            username: req.body.username
        }, function(err, user){
            if(err){
                res.status(500);
                throw err;
            }
            if(!user){
                res.status(404);
                res.json({ message: 'Auth failed. User not found'});
            }
            else if(user){
                var test = bcrypt.compareSync(req.body.password, user.password)
                if(test !== true){
                    res.json({ message: 'Auth failed. password invalid'});
                }
                else{
                    const payload = {
                        username: user.username
                    };

                    var token = jwt.sign(payload, config.crpyt, {
                        expiresIn: 1440
                    });

                    res.status(200);
                    res.json({
                        message: true,
                        data: token
                    });
                }
            }
        });
    }
}