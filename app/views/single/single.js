var PizzaViewModel = require('../../shared/models/pizza');

var pizza = PizzaViewModel({
	name: 'Margarita',
	price: 15.49,
	description: 'This is a classic pizza.',
	nett: '1200 grams'
});

exports.load = function load(args) {
	var page = args.object;
	page.bindingContext = pizza;
};