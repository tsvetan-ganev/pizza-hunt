/// <reference path="../../typings/node/node.d.ts" />

var frames = require('ui/frame');
var observable = require("data/observable");
var PizzaListViewModel = require('../../shared/view-models/pizza-list');

var pizzaList = PizzaListViewModel([]);
var viewModel = new observable.Observable({
    pizzas: pizzaList
});

exports.navigatedTo = function (args) {
    var page = args.object;
    page.bindingContext = viewModel;
    pizzaList.empty();
    pizzaList.load();
};

exports.viewDetails = function (args) {
    frames.topmost().navigate({
        moduleName: './views/details/details',
        context: viewModel.pizzas.getItem(args.index)
    });
};
