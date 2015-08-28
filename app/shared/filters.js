var filters = (function () {
    'use strict';

    var filters = {};

    filters.money = function (amount, currency, placeAfter) {
        amount = amount || 0.00;
        currency = currency || '$';
        placeAfter = placeAfter;

        amount = amount.toFixed(2);

        return placeAfter ? currency + ' ' + amount : amount + ' ' + currency;
    };

    filters.asList = function (items) {
        return items.join(', ');
    };

    return filters;
}());

module.exports = filters;