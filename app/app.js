var app = require('application'),
    filters = require('./shared/filters');
    
global.USER_ID = '';
global.USER_NAME = '';
global.USER_EMAIL = ''

app.resources.money = filters.money;
app.resources.asList = filters.asList;
app.mainModule = './views/login/login';
app.cssFile = './app.css';
app.start();