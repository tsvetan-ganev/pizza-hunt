var frameModule = require('ui/frame'),
    dialogs = require('ui/dialogs'),
    UserViewModel = require('../../shared/models/user'),
    user = UserViewModel();

exports.init = function (args) {
    var page = args.object;
    page.bindingContext = user;
};

exports.register = function (args) {
    var page = args.object,
        user = page.bindingContext;

    if (userDetailsAreValid(user)) {
        setTimeout(function () {
            var topmost = frameModule.topmost();
            topmost.navigate('./views/list/list');
        }, 2000);
    } else {
        dialogs.alert({
            message: 'Your data is incomplete or invalid. Please have a look at it again.',
            okButtonText: 'Okay, I will try harder this time.'
        });
    }
};

function userDetailsAreValid(user) {
    var phoneRegex = /^08[\d]{8}$/,
        emailRegex = /^[a-z](\w*\.?\w|\w*-?\w)*@[a-z](\w*\.?\w|\w*-?\w)*\.(\w){2,}$/;

    if (user.get('firstName') === '' || user.get('lastName') === '' || user.get('email') === '') {
        return false;
    }

    if (!user.get('phone').match(phoneRegex)) {
        return false;
    }

    if (!user.get('email').match(emailRegex)) {
        return false;
    }

    return true;
}