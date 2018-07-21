'use strict';

var mongoose = require('mongoose'),
    Question = mongoose.model('Question');

exports.list_questions = function(req, res){
    Question.find({}, function(err, question){
        if(err)
            res.send(err);
        res.json(question);
    });
};

exports.read_question = function(req, res){
    Question.findById({ _id: req.params.questionId }, function(err, question){
        if(err)
            res.send(err);
        res.json(question);
    });
};

exports.read_by_user = function(req, res){
    Question.findOne({ userID: req.params.userId }, function(err, question){
        if(err)
            res.send(err);
        res.json(question);
    });
};

exports.create_question = function(req, res){
    var new_question = new Question(req.body);
    new_question.save(function(err, question){
        if(err)
            res.send(err);
        res.json(question);
    });
};

exports.edit_question = function(req, res){
    Question.findOneAndUpdate({ _id : req.params.questionId }, req.body, { new: true }, function(err, question){
        if(err)
            res.send(err);
        res.json(question);
    });
};

exports.delete_question = function(req, res){
    Question.remove({ _id: req.params.questionId }, function(err, question){
        if(err)
            res.send(err);
        res.json({ message: 'Question succesfully deleted' });
    });
};