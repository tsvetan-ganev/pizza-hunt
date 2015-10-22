function UserViewModel(info) {
    'use strict';

    var observableModule = require('data/observable'),
        http = require('http'),
        appSettings = require('application-settings'),
        config = require('../../shared/config'),
        user;

    info = info || {};

    /**
     * Constructs an observable object of type User.
     */
    user = new observableModule.Observable({
        _id: info._id || '',
        email: info.email || '',
        firstName: info.firstName || '',
        lastName: info.lastName || '',
        phone: info.phone || '',
        password: info.password || ''
    });

    /**
     * Handles the signing in of a user.
     */
    user.login = function () {
        return new Promise(function (resolve, reject) {
            if (user.get('email') === '' || user.get('password') === '') {
                reject('Email and password fields cannot be empty.');
                return;
            }

            http.getJSON(config.remoteServiceUrl + 'users?email=' + user.get('email'))
                .then(function (data) {
                    if (data.length > 0) {
                        data.forEach(function (registeredUser) {
                            if (user.get('email') === registeredUser.email &&
                                user.get('password') === registeredUser.password) {
                                user.set('_id', registeredUser._id);
                                user.set('firstName', registeredUser.firstName);
                                user.set('lastName', registeredUser.lastName);
                                user.set('email', registeredUser.email);
                                resolve();
                                return;
                            } else {
                                reject('Invalid credentials.');
                                return;
                            }
                        });
                    } else {
                        reject('This account is not registered yet.');
                        return;
                    }
                })
                .catch(function () {
                    reject('No internet connection.');
                    return;
                });
        });

    };

    /**
     * Handles the registration of new users.
     */
    user.register = function () {
        return new Promise(function (resolve, reject) {
            checkIfUserExists()
                .then(createRegisteredUser)
                .then(resolve)
                .catch(function (err) {
                    reject(err);
                });
        });
    };

    /**
     * Saves the information of a user into the database.
     */
    var createRegisteredUser = function () {
        return new Promise(function (resolve, reject) {
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
                reject('The newly created user could not be saved due to connection problems.');
            });
        });
    };

    /**
     * Saves the registered user login data to the device.
     */
    user.saveCredentialsLocally = function () {
        appSettings.setBoolean('isRegistered', true);
        appSettings.setString('email', user.get('email'));
        appSettings.setString('password', user.get('password'));
    };

    /**
     * Checks if user with a given email address already exists in the database.
     */
    var checkIfUserExists = function () {
        return new Promise(function (resolve, reject) {
            http.getJSON(config.remoteServiceUrl + 'users?email=' + user.get('email'))
                .then(function (data) {
                    if (data.length > 0) {
                        reject('A user with the same email address already exists.');
                        return;
                    } else {
                        resolve();
                        return;
                    }
                })
                .catch(function () {
                    reject('No internet connection.');
                });
        });
    };

    return user;
}

module.exports = UserViewModel;