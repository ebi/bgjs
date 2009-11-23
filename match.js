YUI.add('bgmatch', function (Y) {
	// Y.namespace('bgmatch');
	Y.namespace('bgmatch').match = function (id, options) {
		var board, container, canvas, games, moves, size, direction;

		if ('undefined' === typeof(options)) {
			options = {};
		}
		
		size = ('undefined' === options.size) ? 36 : options.size;
		direction = ('undefined' === options.direction) ? 36 : options.direction;
		
		container = Y.one('#' + id);
		container.set('innerHTML', '');
		
		canvas = 'bgboard_' + Math.random();
		container.append('<canvas id="' + canvas + '">You need Canvas</canvas>');
		board = new bgboard(canvas, size, direction);
	};
},
"1.0.0",
{
	requires: ["node"]
});