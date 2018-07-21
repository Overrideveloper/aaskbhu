'use strict';
module.exports = function(app) {
    var questionCtrl = require('../controllers/QuestionController');

    app.route('/question/list')
        .get(questionCtrl.list_questions);

    app.route('/question/create')
        .post(questionCtrl.create_question);

    app.route('/question/read/:questionId')
        .get(questionCtrl.read_question);

    app.route('/question/read_by_user/:userId')
        .get(questionCtrl.read_by_user);

    app.route('/question/edit/:questionId')
        .put(questionCtrl.edit_question);
        
    app.route('/question/delete/:questionId')
        .delete(questionCtrl.delete_question);
};
