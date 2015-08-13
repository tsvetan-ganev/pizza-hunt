/// <reference path="../../typings/node/node.d.ts" />

var dialogs = require('ui/dialogs');
var http = require('http');
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

