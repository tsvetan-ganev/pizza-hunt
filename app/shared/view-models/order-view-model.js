var observableModule = require('data/observable'),
    observableArrayModule = require('data/observable-array'),
    PizzaListViewModel = require('../../shared/view-models/pizza-list-view-model'),
    PizzaViewModel = require('../../shared/view-models/pizza-view-model');

function OrderViewModel() {

    var orderViewModel = new observableModule.Observable({
        pizzas: PizzaListViewModel([]),
        total: 0.00
    });

    orderViewModel.add = function (orderedPizza) {
        var pizza,
            pizzaIndex;

        if (orderedPizza === null) {
            return;
        }

        pizza = {
            id: orderedPizza.id,
            name: orderedPizza.name,
            price: orderedPizza.price,
            quantity: orderedPizza.quantity,
            subtotal: orderedPizza.price * orderedPizza.quantity
        };

        pizzaIndex = indexOf(pizza);
        if (pizzaIndex === -1) {
            orderViewModel.pizzas.push(pizza);
        } else {
            updateProductQuantity(pizzaIndex);
        };

        orderViewModel.total += pizza.subtotal;
    };

    orderViewModel.remove = function (index) {
        if (index < 0 || index >= orderViewModel.pizzas.length) {
            throw new Error('Index outside of boundaries.');
        }

        if (orderViewModel.empty()) {
            throw new Error('The list is already empty!');
        }

        orderViewModel.total -= orderViewModel.pizzas[index].subtotal;
        orderViewModel.pizzas.splice(index, 1);
    };

    orderViewModel.isEmpty = function () {
        return orderViewModel.pizzas.length === 0;
    };

    orderViewModel.empty = function () {
        orderViewModel.pizzas.empty();
        orderViewModel.set('total', 0.00);
    };

    var indexOf = function (product) {
        var i = 0,
            len = orderViewModel.pizzas.length;

        for (; i < len; i++) {
            if (product.id === orderViewModel.pizzas.getItem(i).id) {
                return i;
            }
        }

        return -1;
    };

    var updateProductQuantity = function (index) {
        var product = orderViewModel.pizzas.getItem(index),
            currentQuantity = product.quantity;

        product.quantity = ++currentQuantity;
        product.subtotal += product.price;
    };

    return orderViewModel;
}

module.exports = OrderViewModel;