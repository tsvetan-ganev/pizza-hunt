(function () {
    'use strict';

    var frames = require('ui/frame');
    var observable = require("data/observable");
    var PizzaListViewModel = require('../../shared/view-models/pizza-list-view-model');

    var viewModel = new observable.Observable({
        pizzaList: PizzaListViewModel([]),
        isLoading: false
    });

    exports.navigatedTo = function (args) {
        var page = args.object;
        page.bindingContext = viewModel;
    };

    exports.onLoad = function (args) {
        var page = args.object;
        page.bindingContext = viewModel;
        viewModel.isLoading = true;
        viewModel.pizzaList.empty();
        viewModel.pizzaList.load().then(function() {
            viewModel.isLoading = false;
        });
    };

    exports.viewDetails = function (args) {
        frames.topmost().navigate({
            moduleName: './views/details/details',
            context: viewModel.pizzaList.getItem(args.index)
        });
    };
} ());

