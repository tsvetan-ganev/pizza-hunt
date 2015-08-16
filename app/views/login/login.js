(function () {
    'use strict';
    
    var dialogs = require('ui/dialogs'),
        frameModule = require('ui/frame'),
        UserViewModel = require('../../shared/view-models/user');

    var user = UserViewModel();

    exports.init = function (args) {
        var page = args.object;
        user.set('email', 'ivan@gmail.com');
        user.set('password', 'ivanivanov');
        page.bindingContext = user;
    };

    exports.validateCredentials = function () {
        user.login(signIn, invalidCredentials);
    };

    exports.signUp = function () {
        var topmost = frameModule.topmost();
        topmost.navigate('./views/sign-up/sign-up');
    };

    function signIn() {
        var topmost = frameModule.topmost();
        topmost.navigate('./views/list/list');
    };

    function invalidCredentials(errorMsg) {
        dialogs.alert({
            message: errorMsg,
            okButtonText: 'Try again'
        });
    };
} ());