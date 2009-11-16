function bgjs(id, scale) {
	var canvas, ctx, line, border, width, height, background, colors;
	
	init(id, scale);
	
	colors = {
		background: 'grey',
		border: 'black',
		field: ['red', 'green'],
		checker: ['black', 'white'],
		dice: 'green',
		text: 'white'
	}
	
	function init(id, scale) {
		canvas = document.getElementById(id);
		ctx = canvas.getContext('2d');
		
		if  ('undefined' === typeof(scale)) {
			scale = 24;
		}
		
		line = scale;
		border = line / 2;
		width = line * 15;
		height = line * 12;
		canvas.width = width;
		canvas.height = height;
	}
	
	function drawBoard() {
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
	}
	
	function drawFields() {
		var lineHeight = 5 * line;
		for (var i = 0; i < 12 ;i += 1) {
			var x, y, type, yHeight;
			type = i % 2;
			x = border + (i * line);
			if (5 <i ) {
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
	}
	
	drawBoard();
	
}
