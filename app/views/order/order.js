(function () {
    'use strict';

    var frames = require('ui/frame'),
        dialogs = require('ui/dialogs'),
        createOrderViewModel = require('../../shared/view-models/order-view-model'),
        orderViewModel,
        detailsViewModel;

    orderViewModel = createOrderViewModel();
    detailsViewModel = {};

    exports.navigatedTo = function (args) {
        var page = args.object;
        page.bindingContext = orderViewModel;
        detailsViewModel = page.navigationContext;

        if (detailsViewModel) {
            orderViewModel.add({
                id: detailsViewModel.product.id,
                name: detailsViewModel.product.name,
                price: detailsViewModel.product.price,
                quantity: detailsViewModel.quantity
            });
        }
    };

    exports.removeProduct = function (args) {
        var product = args.view.bindingContext,
            index = orderViewModel.products.indexOf(product);

        orderViewModel.remove(index);
    };

    exports.sendOrder = function () {
        // TODO: Add information about the user
        orderViewModel.send().then(function () {
            orderViewModel.empty();
            dialogs.alert({
                message: 'Order sent successfully.',
                okButtonText: 'That\'s awesome!'
            }).then(navigateToList);
        }).catch(function (err) {
            dialogs.alert({
                message: err,
                okButtonText: 'Try again.'
            });
        });
    };

    exports.backToList = function () {
        navigateToList();
    };

    var navigateToList = function () {
        frames.topmost().navigate('./views/list/list');
    };

} ());

