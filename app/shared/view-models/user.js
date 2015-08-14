var observableModule = require('data/observable');
var http = require('http');
var config = require('../../shared/config');

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
     *
     * @param resolve - callback called when the user has entered valid credentials
     * @param reject(errorMsg) - callback called when the user has entered invalid credentials
     */
    user.login = function (resolve, reject) {
        if (user.get('email') === '' || user.get('password') === '') {
            reject('Email and password fields cannot be empty.');
            return;
        }

        http.getJSON(config.remoteServiceUrl + 'users?email=' + user.get('email'))
            .then(function (data) {
                if (data.length > 0) {
                    data.forEach(function (registeredUser) {
                        if (user.get('email') === registeredUser.email
                            && user.get('password') === registeredUser.password) {
                            resolve();
                            return;
                        } else {
                            reject('Invalid credentials.');
                            return;
                        }
                    });
                } else {
                    reject('This account is not registered yet.');
                }
            })
            .catch(function (err) {
                throw new Error(err);
            });
    };

    /**
     * Handles the registration of new users.
     *
     * @param resolve - callback called when the registration details are complete and valid
     * @param reject(errorMsg) - callback called when the registration details are incomplete or invalid
     */
    user.register = function (resolve, reject) {
        if (user.get('firstName') === '' || user.get('lastName') === ''
            || user.get('email') === '' || user.get('phone') === '') {
            reject('All fields are required.');
            return;
        }

        if (!phoneIsValid(user.get('phone'))) {
            reject('Your phone number seems to be invalid. Please check it again.');
            return;
        }

        if (!emailIsValid(user.get('email'))) {
            reject('Your email seems to be invalid. Please have a look at it again.');
            return;
        }

        checkIfUserExists(resolve, reject);
    };

    /**
     * Checks if user with a given email address already exists in the database.
     *
     * @param resolve - callback called when the user does not already exist
     * @param reject(errorMsg) - callback called when the user already exist
     */
    var checkIfUserExists = function (resolve, reject) {
        http.getJSON(config.remoteServiceUrl + 'users?email=' + user.get('email'))
            .then(function(data) {
                if (data.length > 0) {
                    reject('A user with the same email address already exists.');
                    return;
                } else {
                    saveRegisteredUser(resolve, reject);
                }
            })
            .catch(function (errorMsg) {
                reject(errorMsg);
            });
    };

    /**
     * Saves the information of a user into the database.
     *
     * @param resolve - callback called when data was saved successfully
     * @param reject - callback called when user data could not be persisted
     */
    var saveRegisteredUser = function (resolve, reject) {
        http.request({
            url: config.remoteServiceUrl + 'users',
            method: 'POST',
            content: JSON.stringify({
                email: user.get('email'),
                firstName: user.get('firstName'),
                lastName: user.get('lastName'),
                phone: user.get('phone'),
                password: user.get('password')
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function () {
            resolve();
        }).catch(function () {
            reject();
        });
    };

    /**
     * Checks if an email address is a valid one.
     *
     * @return - true if valid, false otherwise
     */
    var emailIsValid = function (email) {
        var emailRegex = /^[a-z](\w*\.?\w|\w*-?\w)*@[a-z](\w*\.?\w|\w*-?\w)*\.(\w){2,}$/;
        return user.get('email').match(emailRegex);
    };

    /**
     * Checks if a mobile phone number is valid.
     * It must comply with the Bulgarian mobile phone numbers standard.
     *
     * @return - true if valid, false otherwise
     */
    var phoneIsValid = function (phone) {
        var phoneRegex = /^08[\d]{8}$/;
        return user.get('phone').match(phoneRegex);
    };

    return user;
}

module.exports = UserViewModel;