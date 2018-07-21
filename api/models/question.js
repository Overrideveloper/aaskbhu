'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
    question: {
        type: String,
        required: 'Question is required'
    },
    userID: {
        type: String,
        required: 'User relationship is required'
    },
    timestamp: {
        type: Number,
        required: 'Timestamp is required'
    }
});

module.exports = mongoose.model('Question', QuestionSchema);
