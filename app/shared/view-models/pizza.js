function PizzaViewModel(options) {
    options = options || {};

     var pizza = ({
        id: options.id || '',
        name: options.name || 'Pizza',
        description: options.description || 'No description.',
        price: options.price || 0.00,
        nett: options.nett || '0 g',
        ingredients: options.ingredients || [],
        picUrl: options.picUrl || 'res://default_pizza'
    });
    
    return pizza;
}

module.exports = PizzaViewModel;