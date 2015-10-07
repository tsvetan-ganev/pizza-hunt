var filters = (function () {
    'use strict';

    var filters = {};

    filters.money = function (amount, currency, append) {
        amount = amount || 0.00;
        currency = currency || '$';
        append = append;

        amount = amount.toFixed(2);

        return append ? amount + ' ' + currency : currency + ' ' + amount;
    };

    filters.asList = function (items) {
        return items.join(', ');
    };

    return filters;
}());

module.exports = filters;