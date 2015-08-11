var observableModule = require('data/observable');

function User(info) {
	info = info || {};

	var viewModel = new observableModule.Observable({
		firstName: info.firstName || "",
		lastName: info.lastName || "",
		phone: info.phone || "",
		email: info.email || "",
		toString: function() {
			return viewModel.get('firstName') + ' '
					+ viewModel.get('lastName') + ' '
					+ viewModel.get('email') + ' '
					+ viewModel.get('phone');
		}
	});

	return viewModel;
}

module.exports = User;