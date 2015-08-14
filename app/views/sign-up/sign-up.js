var frameModule = require('ui/frame'),
    dialogs = require('ui/dialogs'),
    UserViewModel = require('../../shared/view-models/user'),
    user = UserViewModel({});

exports.init = function (args) {
    var page = args.object;
    user.set('email', '');
    user.set('password', '');
    page.bindingContext = user;
};

exports.register = function (args) {
    user.register(regisiterOnSuccess, registerOnError);
};

function regisiterOnSuccess() {
    dialogs.alert({
        message: 'Registration was successful.',
        okButtonText: 'Continue'
    }).then(function () {
        var topmost = frameModule.topmost();
        topmost.navigate('./views/list/list');
    });
}

function registerOnError(errorMsg) {
    dialogs.alert({
        message: errorMsg,
        okButtonText: 'Try again'
    });
}
