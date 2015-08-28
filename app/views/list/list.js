(function () {
    'use strict';

    var frames = require('ui/frame'),
        observable = require('data/observable'),
        createPizzaListViewModel = require('../../shared/view-models/pizza-list-view-model'),
        viewModel;

    viewModel = new observable.Observable({
        pizzaList: createPizzaListViewModel([]),
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
        viewModel.pizzaList.load().then(function () {
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

