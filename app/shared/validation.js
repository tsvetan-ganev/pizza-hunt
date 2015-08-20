var validation = (function() {
    'use strict';

    /**
     * Checks if an email address is a valid one.
     *
     * @return - true if valid, false otherwise
     */
    var emailIsValid = function (email) {
        var emailRegex = /^[a-z](\w*\.?\w|\w*-?\w)*@[a-z](\w*\.?\w|\w*-?\w)*\.(\w){2,}$/;
        return email.match(emailRegex);
    };

    /**
     * Checks if a password is strong enough (at least 8-characters long).
     * TODO: More advanced check.
     *
     * @return - true if it is strong, false otherwise
     */
    var passwordIsStrong = function (password) {
        return password.length >= 8;
    };

    /**
     * Checks if a mobile phone number is valid.
     * It must comply with the Bulgarian mobile phone numbers standard.
     * It must start with '08' and have 10 digits total.
     *
     * @return - true if valid, false otherwise
     */
    var phoneIsValid = function (phone) {
        var phoneRegex = /^08[\d]{8}$/;
        return phone.match(phoneRegex);
    };

    return {
        emailIsValid: emailIsValid,
        passwordIsStrong: passwordIsStrong,
        phoneIsValid: phoneIsValid
    };
}());

module.exports = validation;

