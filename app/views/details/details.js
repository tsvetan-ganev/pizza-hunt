(function () {
    'use strict';

    var frames = require('ui/frame'),
        observable = require('data/observable'),
        viewModel = new observable.Observable({
          quantity: 1,
          product: {}
        });

    exports.navigatedTo = function (args) {
        var page = args.object;
        viewModel.product = page.navigationContext;
        viewModel.quantity = 1;
        page.bindingContext = viewModel;
    };

    exports.backToListView = function (args) {
        frames.topmost().navigate('./views/list/list');
    };

    exports.removeOne = function (args) {
        if(viewModel.quantity > 0) {
            viewModel.quantity -= 1;
        }
    };

    exports.addOne = function (args) {
        if(viewModel.quantity < 10) {
            viewModel.quantity += 1;
        }
    };

    exports.addToOrder = function (args) {
        frames.topmost().navigate({
            moduleName: './views/order/order',
            context: viewModel
        });
    };
} ());
