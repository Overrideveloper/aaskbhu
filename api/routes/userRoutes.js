'use strict';

module.exports = function(app){
    var auth = require('../controllers/AuthController');

    app.route('/signup')
        .post(auth.signup);

    app.route('/authenticate')
        .post(auth.authenticate);

    app.route('/user/:UserId')
        .get(auth.find_user);
};