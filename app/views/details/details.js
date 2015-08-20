(function () {
    'use strict';

    var frames = require('ui/frame');

    var viewModel = {};

    exports.navigatedTo = function (args) {
        var page = args.object;
        viewModel = page.navigationContext;
        page.bindingContext = viewModel;
    };

    exports.backToListView = function (args) {
        frames.topmost().navigate('./views/list/list');
    };

    exports.addToOrder = function (args) {
        frames.topmost().navigate({
            moduleName: './views/order/order',
            context: viewModel
        });
    };
} ());
