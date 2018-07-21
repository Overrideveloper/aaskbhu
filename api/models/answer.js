'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnswerSchema = new Schema({
    answer: {
        type: String,
        required: 'Answer is required'
    },
    userID: {
        type: String,
        required: 'User relationship is required'
    },
    questionID: {
        type: String,
        required: 'Question relationship is required'
    },
    claps: {
        type: Number,
        required: 'Clap value is required'
    },
    timestamp: {
        type: Number,
        required: 'Timestamp is required'
    }
});

module.exports = mongoose.model('Answer', AnswerSchema);
