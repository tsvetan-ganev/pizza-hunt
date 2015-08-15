var observableModule = require('data/observable');

function PizzaViewModel(options) {
    options = options || {};

     var pizza = ({
        name: options.name || 'Pizza',
        description: options.description || 'No description.',
        price: options.price || 0.00,
        nett: options.nett || 0,
        ingredients: options.ingredients || [],
        picUrl: options.picUrl || 'res://default_pizza'
    });

    pizza.ingredientsToString = function () {
        var result = '',
            i = 0,
            len = pizza.ingredients.length;

        for (; i < len; i++) {
            if (i === len - 1) {
                result = result.concat(pizza.ingredients[i]);
            } else {
                result = result.concat(pizza.ingredients[i], ', ');
            }
        }

        return result;
    };

    return pizza;
}

module.exports = PizzaViewModel;