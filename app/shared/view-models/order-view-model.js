function OrderViewModel() {
    'use strict';

    var observableModule = require('data/observable'),
        createPizzaListViewModel = require('../../shared/view-models/pizza-list-view-model'),
        orderViewModel;

    orderViewModel = new observableModule.Observable({
        products: createPizzaListViewModel([]),
        total: 0.00
    });

    orderViewModel.add = function (orderedProduct) {
        var product,
            productIndex;

        if (orderedProduct === null || orderedProduct === undefined) {
            return;
        }

        product = {
            id: orderedProduct.id,
            name: orderedProduct.name,
            price: orderedProduct.price,
            quantity: orderedProduct.quantity,
            subtotal: orderedProduct.price * orderedProduct.quantity
        };

        productIndex = indexOf(product);
        if (productIndex === -1) {
            orderViewModel.products.push(product);
        } else {
            updateProductQuantityAndPrice(productIndex, product.quantity);
            // this is a hack to update the underlying observable array
            orderViewModel.products.push();
        }

        orderViewModel.total += product.subtotal;
    };

    orderViewModel.remove = function (index) {
        if (index < 0 || index >= orderViewModel.products.length) {
            throw new Error('Index outside of boundaries.');
        }

        if (orderViewModel.isEmpty()) {
            throw new Error('The list is already empty!');
        }

        var product = orderViewModel.products.getItem(index);
        orderViewModel.total -= product.subtotal;
        orderViewModel.products.splice(index, 1);
    };

    orderViewModel.isEmpty = function () {
        return orderViewModel.products.length === 0;
    };

    orderViewModel.empty = function () {
        orderViewModel.products.empty();
        orderViewModel.set('total', 0.00);
    };

    var indexOf = function (product) {
        var i = 0,
            len = orderViewModel.products.length;

        for (; i < len; i += 1) {
            if (product.id === orderViewModel.products.getItem(i).id) {
                return i;
            }
        }

        return -1;
    };

    var updateProductQuantityAndPrice = function (index, addedQuantity) {
        var product = orderViewModel.products.getItem(index);

        product.quantity += addedQuantity;
        product.subtotal = product.price * product.quantity;
    };

    return orderViewModel;
}

module.exports = OrderViewModel;