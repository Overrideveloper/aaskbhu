'use strict';
module.exports = function(app) {
    var answerCtrl = require('../controllers/AnswerController');

    app.route('/answer/read_by_user/:userId')
        .get(answerCtrl.read_by_user);
        
    app.route('/answer/create')
        .post(answerCtrl.create_answer);

    app.route('/answer/read_by_question/:questionId')
        .get(answerCtrl.read_by_question);

    app.route('/answer/delete/:answerId')
        .delete(answerCtrl.delete_answer);

    app.route('/answer/edit/:answerId')
        .put(answerCtrl.edit_answer);
};
