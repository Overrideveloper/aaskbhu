'use strict';

var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs'),
    config = require('../../config'),
    User = mongoose.model('User');

exports.signup = function(req, res){
    console.log(req.body.email);
        var password = bcrypt.hashSync(req.body.password, 8);
        var user = new User({
            username: req.body.email,
            email: req.body.email,
            name: req.body.name,
            password: password
        });
        user.save(function(err, user){
                res.json({ _id: user._id, message: 'User created. Authenticate to get token'});
        });
}

exports.authenticate = function(req, res){
        User.findOne({
            username: req.body.username
        }, function(err, user){
            if(err){
                throw err;
            }
            if(!user){
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
                    res.json({
                        message: true,
                        _id: user._id
                    });
                }
            }
        });
}

exports.find_user = function(req, res){
    User.findById({ _id : req.params.UserId }, function(err, user){
        res.json(user);
    });
};
