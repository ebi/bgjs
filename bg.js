/*global document */
function bgjs(id, scale) {
	var init, drawBoard, drawFields,//Private Functions
	field, //Objects
	canvas, ctx, line, border, width, height, colors, fields = []; //Properties
	
	colors = {
		background: 'grey',
		border: 'black',
		field: ['darkred', 'green'],
		checker: [
			{border: 'black', fill: 'red'},
			{border: 'black', fill: 'Lime'}
		],
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
			fields[i] = new field(x, y, i);
			ctx.fillStyle = colors.field[type];
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x + border, yHeight);
			ctx.lineTo(x + line, y);
			ctx.fill();
			
			//Bottom Field
			y = height - border;
			yHeight = height - lineHeight;
			fields[i + 12] = new field(x, y, i + 12);
			ctx.fillStyle = colors.field[!type + 0];
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x + border, yHeight);
			ctx.lineTo(x + line, y);
			ctx.fill();
		}
	};
	
	field = function(posX, posY, number) {
		var fieldX, fieldY, position = number, place, checkers = 0;
		place = (number < 12) ? 1 : -1;
		fieldX = posX + place * line / 2;
		fieldY = posY + place * line / 2;
		
		this.addChecker = function (type) {
			var checkerX, checkerY, pos;
			checkerX = fieldX;
			checkerY = fieldY + place * checkers * line;
			
			ctx.strokeStyle = colors.checker[type].border;
			ctx.fillStyle = colors.checker[type].fill;
			
			ctx.beginPath();
			ctx.arc(checkerX, checkerY, border - 1 , 0, Math.PI * 2, true);
			ctx.fill();
			ctx.stroke();
			
			checkers += 1;
			return checkers;
		}
		
		this.removeChecker = function () {
			if (0 === checkers) {
				return 0;
			}
			
			checkers -= 1;
			return checkers;
		}
		
		this.countChecker = function () {
			return checkers;
		}
		
		this.getPosition = function () {
			return position;
		}
	}
	
	init(id, scale);
	drawBoard();
	fields[0].addChecker(0);
	fields[1].addChecker(1);
	fields[1].addChecker(1);
	fields[1].addChecker(1);
	fields[22].addChecker(1);
	fields[22].addChecker(1);
}
