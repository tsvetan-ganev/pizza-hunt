var frameModule = require('ui/frame'),
    dialogs = require('ui/dialogs'),
    UserViewModel = require('../../shared/view-models/user'),
    user = UserViewModel();

exports.init = function (args) {
    var page = args.object;
    page.bindingContext = user;
};

exports.register = function (args) {
    var page = args.object,
        user = page.bindingContext;

    user.register(function () {
        var topmost = frameModule.topmost();
        topmost.navigate('./views/list/list');
        return;
    }, function (error) {
        dialogs.alert({
            message: error,
            okButtonText: 'Okay, I will try harder this time.'
        });
    });
};
