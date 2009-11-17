/*global document */
function bgjs(id, scale) {
	var init, drawBoard, drawFields,//Private Functions
	canvas, ctx, line, border, width, height, colors; //Properties
	
	colors = {
		background: 'grey',
		border: 'black',
		field: ['red', 'green'],
		checker: ['black', 'white'],
		dice: 'green',
		text: 'white'
	};
	
	init = function (id, scale) {
		canvas = document.getElementById(id);
		ctx = canvas.getContext('2d');
		
		if  ('undefined' === typeof(scale)) {
			//Should to be %3 and %4
			//Good sizes: 12 24 36 48 60
			scale = 36;
		}
		
		line = scale;
		border = line / 2;
		width = line * 15;
		height = line * 12;
		canvas.width = width;
		canvas.height = height;
	};
	
	drawBoard = function () {
		//Border
		ctx.fillStyle = colors.border;
		ctx.fillRect(0, 0, width, height);
		
		//Background
		ctx.fillStyle = colors.background;
		ctx.fillRect(border, border, width - line, height - line);
		
		//Bar
		ctx.fillStyle = colors.border;
		ctx.fillRect(line * 6.5, border, line * 2, height - line);
		
		//Fields
		drawFields();
	};
	
	drawFields = function () {
		var lineHeight, i, x, y, type, yHeight;
		lineHeight = 5 * line;
		for (i = 0; i < 12 ;i += 1) {
			type = i % 2;
			x = border + (i * line);
			if (5 < i) {
				x += 2 * line; //Add the bar
			}
			
			//Top Field
			y = border;
			yHeight = lineHeight;
			ctx.fillStyle = colors.field[type];
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x + border, yHeight);
			ctx.lineTo(x + line, y);
			ctx.fill();
			
			//Bottom Field
			y = height - border;
			yHeight = height - lineHeight;
			ctx.fillStyle = colors.field[!type + 0];
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x + border, yHeight);
			ctx.lineTo(x + line, y);
			ctx.fill();
		}
	};
	
	init(id, scale);
	drawBoard();
	
}
