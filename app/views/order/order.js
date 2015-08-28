(function () {
    'use strict';

    var frames = require('ui/frame'),
        createOrderViewModel = require('../../shared/view-models/order-view-model'),
        orderViewModel,
        detailsViewModel;

    orderViewModel = createOrderViewModel();
    detailsViewModel = {};

    exports.onLoad = function (args) {
        var page = args.object;
        page.bindingContext = orderViewModel;
    };

    exports.navigatedTo = function (args) {
        var page = args.object;
        page.bindingContext = orderViewModel;

        detailsViewModel = page.navigationContext;

        orderViewModel.add({
            id: detailsViewModel.product.id,
            name: detailsViewModel.product.name,
            price: detailsViewModel.product.price,
            quantity: detailsViewModel.quantity
        });
    };

    exports.backToList = function () {
        frames.topmost().navigate('./views/list/list');
    };
} ());

