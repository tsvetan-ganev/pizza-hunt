var observableArray = require('data/observable-array');
var observable = require('data/observable-array');
var frames = require('ui/frame');
var OrderViewModel = require('../../shared/view-models/order-view-model');

(function () {
    'use strict';
    var viewModel = OrderViewModel();
    var orderedPizza = {};

    exports.onLoad = function (args) {
        var page = args.object;
        page.bindingContext = viewModel;
    };

    exports.navigatedTo = function (args) {
        var page = args.object;
        page.bindingContext = viewModel;

        orderedPizza = page.navigationContext;

        viewModel.add({
            id: orderedPizza.id,
            name: orderedPizza.name,
            price: orderedPizza.price,
            quantity: 1
        });
    };

    exports.backToList = function (args) {
        frames.topmost().navigate('./views/list/list');
    };
} ());

