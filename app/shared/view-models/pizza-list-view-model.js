function PizzaListViewModel(pizzas) {
    'use strict';

    var http = require('http'),
        observableArrayModule = require('data/observable-array'),
        config = require('../../shared/config'),
        createPizzaViewModel = require('../../shared/view-models/pizza-view-model'),
        pizzaList;

        pizzas = pizzas || [];
        pizzaList = new observableArrayModule.ObservableArray(pizzas);

    /**
     * Loads a list of pizzas from a fake remote service.
     */
    pizzaList.load = function () {
        return new Promise(function (resolve, reject) {
            http.getJSON(config.remoteServiceUrl + 'pizzas')
                .then(function (data) {
                    data.forEach(function (pizza) {
                        var pizzaViewModel = createPizzaViewModel(pizza);
                        pizzaList.push(pizzaViewModel);
                    });
                })
                .catch(function(errorMsg) {
                  reject(errorMsg);
                });
        });
    };

    /**
     * Deletes all items from the observable pizza list.
     */
    pizzaList.empty = function () {
        while (pizzaList.length) {
            pizzaList.pop();
        }
    };

    return pizzaList;
}

module.exports = PizzaListViewModel;