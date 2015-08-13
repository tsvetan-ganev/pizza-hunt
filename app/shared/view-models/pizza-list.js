/// <reference path="../../typings/node/node.d.ts" />
var http = require('http'),
	observableArrayModule = require('data/observable-array');

function PizzaListViewModel(pizzas) {
	pizzas = pizzas || [];
	var viewModel = new observableArrayModule.ObservableArray();

	/**
	 * Loads a list of pizzas from a fake remote service.
	 */
	viewModel.load = function() {
		http.getJSON('http://10.0.2.2:3000/pizzas')
			.then(function(data) {
				data.forEach(function(pizza) {
					viewModel.push({
						name: pizza.name,
						description: pizza.description,
						price: pizza.price,
						nett: pizza.nett,
						picUrl: pizza.picUrl
					});
				});
			});
	};

	/**
	 * Deletes all items from the observable pizza list.
	 */
	viewModel.empty = function() {
		while (viewModel.length) {
			viewModel.pop();
		}
	};

	return viewModel;
}

module.exports = PizzaListViewModel;