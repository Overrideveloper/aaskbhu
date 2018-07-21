'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String,
        required: 'Full name is required'
    },
    email: {
        type: String,
        required: 'Email is required',
        unique: true
    },
    username: {
        type: String,
        required: 'username is required',
        unique: true
    },
    password: {
        type: String,
        required: 'Password is required'
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model('User', UserSchema);
