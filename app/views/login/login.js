var dialogs = require('ui/dialogs'),
	frameModule = require('ui/frame'),
	UserViewModel = require('../../shared/view-models/user');

var user = UserViewModel({
    email: 'ivan@gmail.com',
    password: 'ivanivanov'
});

exports.init = function(args) {
    var page = args.object;
    page.bindingContext = user;
};

exports.validateCredentials = function() {
	user.login(signIn, invalidCredentials);
};

exports.signUp = function() {
	var topmost = frameModule.topmost();
	topmost.navigate('./views/sign-up/sign-up');
};

function signIn () {
	var topmost = frameModule.topmost();
	topmost.navigate('./views/list/list');
};

function invalidCredentials() {
	dialogs.alert({
			message: 'Invalid credentials.',
			okButtonText: 'Try again'
	});
}