var app = require("application");
var filters = require('./shared/filters');

app.resources['money'] = filters.money;
app.resources['asList'] = filters.asList;
app.mainModule = "./views/login/login";
app.cssFile = "./app.css";
app.start();
