(function () {
    'use strict';

    var frames = require('ui/frame'),
        observable = require('data/observable'),
        viewModel;

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

    exports.backToListView = function () {
        frames.topmost().navigate('./views/list/list');
    };

    exports.removeOne = function () {
        if (viewModel.quantity > 1) {
            viewModel.quantity -= 1;
        }
    };

    exports.addOne = function () {
        if (viewModel.quantity < 10) {
            viewModel.quantity += 1;
        }
    };

    exports.addToOrder = function () {
        frames.topmost().navigate({
            moduleName: './views/order/order',
            context: viewModel
        });
    };
}());
