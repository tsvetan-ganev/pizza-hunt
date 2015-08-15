/// <reference path="../../typings/node/node.d.ts" />
var http = require('http'),
    observableArrayModule = require('data/observable-array'),
    config = require('../../shared/config'),
    PizzaViewModel = require('../../shared/view-models/pizza');

function PizzaListViewModel(pizzas) {
    pizzas = pizzas || [];
    var pizzaList = new observableArrayModule.ObservableArray(pizzas);

    /**
     * Loads a list of pizzas from a fake remote service.
     */
    pizzaList.load = function() {
        http.getJSON(config.remoteServiceUrl + 'pizzas')
            .then(function(data) {
                data.forEach(function(pizza) {
                    var pizzaViewModel = PizzaViewModel(pizza);
                    pizzaList.push(pizzaViewModel);
                });
            });
    };

    /**
     * Deletes all items from the observable pizza list.
     */
    pizzaList.empty = function() {
        while (pizzaList.length) {
            pizzaList.pop();
        }
    };

    return pizzaList;
}

module.exports = PizzaListViewModel;