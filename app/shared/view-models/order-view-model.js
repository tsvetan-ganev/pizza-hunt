var observableModule = require('data/observable'),
    observableArrayModule = require('data/observable-array'),
    PizzaListViewModel = require('../../shared/view-models/pizza-list-view-model'),
    PizzaViewModel = require('../../shared/view-models/pizza-view-model');

function OrderViewModel() {

    var orderViewModel = new observableModule.Observable({
        products: PizzaListViewModel([]),
        total: 0.00
    });

    orderViewModel.add = function (orderedProduct) {
        var product,
            productIndex;

        if (orderedProduct === null) {
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
        };

        orderViewModel.total += product.subtotal;
    };

    orderViewModel.remove = function (index) {
        if (index < 0 || index >= orderViewModel.products.length) {
            throw new Error('Index outside of boundaries.');
        }

        if (orderViewModel.empty()) {
            throw new Error('The list is already empty!');
        }

        orderViewModel.total -= orderViewModel.products[index].subtotal;
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

        for (; i < len; i++) {
            if (product.id === orderViewModel.products.getItem(i).id) {
                return i;
            }
        }

        return -1;
    };

    var updateProductQuantityAndPrice = function (index, addedQuantity) {
        var product = orderViewModel.products.getItem(index);

        product.quantity += addedQuantity;
        product.subtotal += product.price * addedQuantity;
    };

    return orderViewModel;
}

module.exports = OrderViewModel;