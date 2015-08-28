(function () {
    'use strict';

    var frameModule = require('ui/frame'),
        dialogs = require('ui/dialogs'),
        validation = require('../../shared/validation'),
        createUserViewModel = require('../../shared/view-models/user-view-model'),
        user;

    user = createUserViewModel({});

    exports.init = function (args) {
        var page = args.object;
        page.bindingContext = user;
    };

    exports.register = function () {
        validateSignUpForm()
            .then(user.register)
            .then(signIn)
            .catch(registrationError);
    };

    function signIn() {
        dialogs.alert({
            message: 'Registration was successful.',
            okButtonText: 'Continue'
        }).then(function () {
            var topmost = frameModule.topmost();
            topmost.navigate('./views/list/list');
        });
    }

    function registrationError(errorMsg) {
        dialogs.alert({
            message: errorMsg,
            okButtonText: 'Try again.'
        });
    }

    function validateSignUpForm() {
        return new Promise(function (resolve, reject) {
            if (user.get('firstName') === '' ||
                user.get('lastName') === '' ||
                user.get('email') === '' ||
                user.get('phone') === '') {
                reject('All fields are required.');
                return;
            }

            if (!validation.emailIsValid(user.get('email'))) {
                reject('Your email seems to be invalid. Please have a look at it again.');
                return;
            }

            if (!validation.passwordIsStrong(user.get('password'))) {
                reject('The password must be at least 8 characters long.');
                return;
            }

            if (!validation.phoneIsValid(user.get('phone'))) {
                reject('Your phone number seems to be invalid. Please check it again.');
                return;
            }

            resolve();
        });
    }
} ());