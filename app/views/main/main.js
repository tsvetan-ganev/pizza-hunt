// testing the model binding and the UI elements selector
exports.subscribe =
(function () {
	var view = require('ui/core/view');
	var count = 0;
	function subscribe(args) {
		count += 1;
		var sender = args.object,
			parent = sender.parent;

		if (parent) {
			var label = view.getViewById(parent, 'subscribersCount');
			if (label) {
				label.text = 'There are ' + count + ' subscribers.';
			}
		}
	};

	return subscribe;
} ());