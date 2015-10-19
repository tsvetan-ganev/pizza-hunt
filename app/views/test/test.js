var view = require("ui/core/view"),
    appSettings = require('application-settings');

exports.onLoaded = function (args) {
	var page = args.object;
    
    console.log(appSettings.getString('email'));
    console.log(appSettings.getString('password'));
};