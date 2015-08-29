(function () {
    'use strict';

    var frames = require('ui/frame'),
        observable = require('data/observable'),
        detailsViewModel;

    detailsViewModel = new observable.Observable({
        quantity: 1,
        product: {}
    });

    exports.navigatedTo = function (args) {
        var page = args.object;
        detailsViewModel.set('product', page.navigationContext || {});
        detailsViewModel.set('quantity', 1);
        page.bindingContext = detailsViewModel;
    };

    exports.backToListView = function () {
        frames.topmost().navigate('./views/list/list');
    };

    exports.removeOne = function () {
        if (detailsViewModel.quantity > 1) {
            detailsViewModel.set('quantity', detailsViewModel.quantity - 1);
        }
    };

    exports.addOne = function () {
        if (detailsViewModel.quantity < 10) {
            detailsViewModel.set('quantity', detailsViewModel.quantity + 1);
        }
    };

    exports.addToOrder = function () {
        frames.topmost().navigate({
            moduleName: './views/order/order',
            context: detailsViewModel
        });
    };
}());
