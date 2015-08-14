var observableModule = require('data/observable');

function PizzaViewModel(options) {
    options = options || {};

    var pizza = new observableModule.Observable({
        name: options.name || 'Pizza',
        description: options.description || 'No description.',
        price: options.price || 0.00,
        ingredients: options.ingredients || [],
        nett: options.nett || 0,
        picUrl: options.picUrl || 'res://default_pizza'
    });

    return pizza;
}

module.exports = PizzaViewModel;