'use strict';

var mongoose = require('mongoose'),
    Answer = mongoose.model('Answer');

exports.read_by_user = function(req, res){
    Answer.find({ userID: req.params.userId }, function(err, answer){
        if(err)
            res.send(err);
        res.json(answer);
    });
};

exports.read_by_question = function(req, res){
    Answer.find({ questionID: req.params.questionId }, function(err, answer){
        if(err)
            res.send(err);
        res.json(answer);
    });
};

exports.create_answer = function(req, res){
    var new_answer = new Answer(req.body);
    new_answer.save(function(err, answer){
        if(err)
            res.send(err);
        res.json(answer);
    });
};

exports.delete_answer = function(req, res){
    Answer.remove({ _id: req.params.answerId }, function(err, answer){
        if(err)
            res.send(err);
        res.json({ message: 'Answer succesfully deleted' });
    });
};

exports.edit_answer = function(req, res){
    Answer.findOneAndUpdate({ _id : req.params.answerId }, req.body, { new: true }, function(err, answer){
        if(err)
            res.send(err);
        res.json(answer);
    });
};