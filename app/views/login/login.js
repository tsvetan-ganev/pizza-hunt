var dialogs = require('ui/dialogs'),
	frameModule = require('ui/frame'),
	UserViewModel = require('../../shared/models/user'),
	observableModule = require("data/observable");

var user = UserViewModel({
    email: "user@gmail.com",
    password: '123456'
});

exports.init = function(args) {
    var page = args.object;
    page.bindingContext = user;
};

exports.sendCredentials = function(args) {
	var page = args.object;
	user = page.bindingContext;

	// if(user.get('email') === 'user@gmail.com'
	// 	&& user.get('password') === '123456') {
		dialogs.alert({
			message: 'Successful registration.',
			okButtonText: 'Continue'
		}).then(signIn);
	//} 
	// else {
	// 	dialogs.alert({
	// 		message: 'Wrong account or password.',
	// 		okButtonText: 'Try again.'
	// 	});
	// }
};

exports.signUp = function() {
	var topmost = frameModule.topmost();
	topmost.navigate('./views/sign-up/sign-up');
};

function signIn () {
	var topmost = frameModule.topmost();
	topmost.navigate('./views/list/list');
};