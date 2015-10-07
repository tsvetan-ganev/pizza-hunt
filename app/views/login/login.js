(function () {
    'use strict';

    var dialogs = require('ui/dialogs'),
        frames = require('ui/frame'),
        observable = require('data/observable'),
        createUserViewModel = require('../../shared/view-models/user-view-model');

    var user = createUserViewModel();
    var viewModel = new observable.Observable({
        user: user,
        isLoading: false
    });

    exports.onLoaded = function (args) {
        var page = args.object;
        user.set('email', 'ivan@gmail.com');
        user.set('password', 'ivanivanov');
        viewModel.isLoading = false;
        page.bindingContext = viewModel;
    };

    exports.sendCredentials = function () {
        viewModel.isLoading = true;
        user.login()
            .then(signIn)
            .catch(loginFailure);
    };

    exports.signUp = function () {
        frames.topmost().navigate('./views/sign-up/sign-up');
    };

    function signIn() {
        viewModel.isLoading = false;
        frames.topmost().navigate('./views/list/list');
    }

    function loginFailure(errorMsg) {
        viewModel.isLoading = false;
        dialogs.alert({
            message: errorMsg,
            okButtonText: 'Try again'
        });
    }
} ());