(function () {
    'use strict';
    
    var frames = require('ui/frame');
    var observable = require("data/observable");
    var PizzaListViewModel = require('../../shared/view-models/pizza-list');

    var viewModel = new observable.Observable({
        pizzaList: PizzaListViewModel([])
    });

    exports.navigatedTo = function (args) {
        var page = args.object;
        page.bindingContext = viewModel;
    };

    exports.onLoad = function (args) {
        var page = args.object;
        page.bindingContext = viewModel;
        viewModel.pizzaList.empty();
        viewModel.pizzaList.load();
    };

    exports.viewDetails = function (args) {
        frames.topmost().navigate({
            moduleName: './views/details/details',
            context: viewModel.pizzaList.getItem(args.index)
        });
    };
} ());

