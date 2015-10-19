(function () {
    'use strict';

    var dialogs = require('ui/dialogs'),
        frames = require('ui/frame'),
        observable = require('data/observable'),
        appSettings = require('application-settings'),
        createUserViewModel = require('../../shared/view-models/user-view-model');

    var user = createUserViewModel();
    var viewModel = new observable.Observable({
        user: user,
        isLoading: false
    });

    exports.onLoaded = function (args) {
        var page = args.object;

        user.set('email', appSettings.getString('email'));
        user.set('password', appSettings.getString('password'));

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

    exports.goToTest = function () {
        frames.topmost().navigate('./views/test/test');
    };

    function signIn() {
        user.saveCredentialsLocally();
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