var observableArray = require('data/observable-array');
var observable = require('data/observable-array');
var frames = require('ui/frame');
var OrderViewModel = require('../../shared/view-models/order-view-model');

(function () {
    'use strict';
    var orderViewModel = OrderViewModel();
    var detailsViewModel = {};

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

    exports.backToList = function (args) {
        frames.topmost().navigate('./views/list/list');
    };
} ());

