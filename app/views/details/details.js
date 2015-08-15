
var frames = require('ui/frame');

exports.navigatedTo = function (args) {
    var page = args.object;
    page.bindingContext = page.navigationContext;
};

exports.backToListView = function (args) {
   frames.topmost().navigate('./views/list/list');
};