var filters = (function () {
    var filters = {};

    filters.money = function (amount, currency, placeAfter) {
        amount = amount || 0.00;
        currency = currency || '$';
        placeAfter = placeAfter;

        amount = amount.toFixed(2);

        return placeAfter ? currency + ' ' + amount : amount + ' ' + currency;
    };

    filters.asList = function (items) {
        var result = '',
            i = 0,
            len = items.length;

        for (; i < len; i++) {
            if (i === len - 1) {
                result = result.concat(items[i]);
            } else {
                result = result.concat(items[i], ', ');
            }
        }

        return result;
    };

    return filters;
} ());

module.exports = filters;