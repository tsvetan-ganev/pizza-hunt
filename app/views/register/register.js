var dialogs = require('ui/dialogs'),
	UserViewModel = require('../../shared/models/user');

var user = UserViewModel();

exports.load = function(args) {
	var page = args.object;
	page.bindingContext = user;
};

exports.send = function(args) {
	var page = args.object;
	user = page.bindingContext;
	dialogs.alert({
			message: 'Successful registration. (Not really.)',
			okButtonText: 'Continue'
	});
};