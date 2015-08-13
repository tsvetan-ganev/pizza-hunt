var observableModule = require('data/observable');

function Pizza(options) {
	options = options || {};

	var viewModel = new observableModule.Observable({
		name: options.name || 'Pizza',
		description: options.description || 'No description.',
		price: options.price || 0.00,
		ingredients: options.ingredients || [],
		nett: options.nett || 0,
		picUrl: options.picUrl || 'res://default_pizza'
	});

	return viewModel;
}

module.exports = Pizza;