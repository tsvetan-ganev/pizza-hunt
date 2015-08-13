var observableModule = require('data/observable');
var http = require('http');

function UserViewModel(info) {
	info = info || {};

	/**
	 * Constructs an observable object of type User.
	 */
	var user = new observableModule.Observable({
		email: info.email || '',
		firstName: info.firstName || '',
		lastName: info.lastName || '',
		phone: info.phone || '',
		password: info.password || ''
	});

	/**
	 * Handles the signing in of a user.
	 * @parameter resolve - callback called when the user has entered valid credentials
	 * @parameter reject - callback called when the user has entered invalid credentials
	 */
	user.login = function (resolve, reject) {
		http.getJSON('http://10.0.2.2:3000/users')
			.then(function (data) {
				var success = false;
				data.forEach(function (user) {
					if (user.get('email') === user.email
						&& user.get('password') === user.password) {
						success = true;
						resolve();
					}
				});

				if (!success) {
					reject();
				}
			})
			.catch(function (err) {
				throw new Error(err);
			});
	};

	/**
	 * Handles the registration of new users.
	 * @parameter resolve - callback called when the registration details are complete and valid
	 * @parameter reject(errorMsg) - callback called when the registration details are incomplete or invalid
	 */
	user.register = function (resolve, reject) {
		var phoneRegex = /^08[\d]{8}$/,
			emailRegex = /^[a-z](\w*\.?\w|\w*-?\w)*@[a-z](\w*\.?\w|\w*-?\w)*\.(\w){2,}$/;

		if (user.get('firstName') === '' || user.get('lastName') === ''
			|| user.get('email') === '' || user.get('phone') === '') {
			reject('All fields are required.');
			return;
		}

		if (!user.get('phone').match(phoneRegex)) {
			reject('Your phone number seems to be invalid. Please check it again.');
			return;
		}

		if (!user.get('email').match(emailRegex)) {
			reject('Your email seems to be invalid. Please have a look at it again.');
			return;
		}

		resolve();
	};

	return user;
}

module.exports = UserViewModel;