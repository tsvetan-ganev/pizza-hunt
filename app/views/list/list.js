function pageLoaded(args) {
    var page = args.object;
    var viewModel = {
        pizzas:  [
        {
            name: 'Margarita',
            description: 'A light pizza with olive oil, garlic, fresh basil, fresh tomatoes, mozzarella and Parmesan cheeses. Perfect with a beer on a hot summer night.',
            price: 7.45,
            nett: '1 kg',
            picUrl: 'res://pizza_margarita'
        },
        {
            name: 'Vegetariana',
            description: 'Specially made for hipster vegan parties.',
            price: 5.30,
            nett: '900 g',
            picUrl: 'res://pizza_vegetariana'
        },
        {
            name: 'Capricciosa',
            description: 'Mozzarella cheese, Italian baked ham, mushroom, artichoke and tomato.',
            price: 8.45,
            nett: '650 g',
            picUrl: 'res://pizza_capricciosa'
        },
        {
            name: 'Napoletana',
            description: 'Made with fresh tomatoes and classic Italian Mozzarella cheese.',
            price: 6.10,
            nett: '500 g',
            picUrl: 'res://pizza_napoletana'
        }
    ]
   };

    page.bindingContext = viewModel;
};

exports.pageLoaded = pageLoaded;