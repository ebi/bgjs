/*global document */
function bgjs(id, scale, direction) {
	var init, drawBoard, drawFields,//Private Functions
	field, //Objects
	that, canvas, ctx, line, border, width, height, colors, fields = [], direction; //Properties
	
	that = this;
	
	colors = {
		background: 'lightblue',
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
		
		if ('undefined' === typeof(direction) || 0 === direction || 'right' === direction) {
			direction = 0
		} else {
			direction = 11;
		}
		
		line = scale;
		border = line / 2;
		width = line * 15;
		height = line * 12;
		canvas.width = width;
		canvas.height = height;
		that.drawBoard();
	};
	
	this.drawBoard = function () {
		ctx.clearRect(0, 0, width, height);
		
		//Border
		ctx.fillStyle = colors.border;
		ctx.fillRect(0, 0, width, height);
		
		//Background
		ctx.fillStyle = colors.background;
		ctx.fillRect(border, border, width - line, height - line);
		
		//Bar
		ctx.fillStyle = colors.border;
		ctx.fillRect(line * 6.5, border, line * 2, height - line);
		
		//Fields & Checkers
		drawFields();
	};
	
	drawFields = function () {
		var lineHeight, i, x, y, type, yHeight;
		lineHeight = 5 * line;
		for (i = 0; i < 12 ;i += 1) {
			var num = Math.abs(direction - i);
			type = i % 2;
			x = border + (i * line);
			if (5 < i) {
				x += 2 * line; //Add the bar
			}
			
			//Top Field
			drawField(x, border, lineHeight, colors.field[type], num);
			
			//Bottom Field
			drawField(x, height - border, height - lineHeight, colors.field[!type + 0], 23 - num)
		}
	};
	
	drawField = function (x, y, yHeight, color, number) {
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x + border, yHeight);
		ctx.lineTo(x + line, y);
		ctx.fill();
		if ('undefined' === typeof(fields[number])) {
			fields[number] = new field(that, x, y, number, 0);
		} else {
			fields[number].drawCheckers();
		}
	}
	
	this.move = function (from, to, type) {
		from -= 1;
		to -= 1;
		
		if ('undefined' !== typeof(fields[from])) {
			type = fields[from].getType();
			fields[from].removeChecker();
		} else if ('undefined' === typeof(type)) {
			type = 1;
		}
		
		if ('undefined' !== typeof(fields[to])) {
			fields[to].addChecker(type);
		}
	};
	
	field = function(boardRef, posX, posY, number, type) {
		var that, board, fieldX, fieldY, position = number, place, checkers = 0, color, drawNumber;
		that = this;
		board = boardRef;
		color = type;
		place = (number < 12) ? 1 : -1;
		fieldX = posX + line / 2;
		fieldY = posY + place * line / 2;
		
		ctx.textAlign = 'center';
		ctx.font = '800 ' + scale / 3 + 'px Helvetica, sans-serif'
		ctx.fillStyle = colors.text;
		
		//TODO: Improve text placement
		ctx.fillText(position + 1, fieldX, posY - (place - 1) * line / 4 - 2);
		
		this.getType = function () {
			return color;
		}
		
		this.addChecker = function (type) {
			if (color !== type) {
				color = type;
				if (checkers > 0) {
					this.drawCheckers();
				}
			}
			
			this.drawChecker(checkers)
			checkers += 1;
			return checkers;
		};
		
		this.drawCheckers = function () {
			for (var i = 0; i < checkers; i += 1) {
				this.drawChecker(i);
			}
		};
		
		this.drawChecker = function (num) {
			var checkerX, checkerY, pos;
			checkerX = fieldX;
			checkerY = fieldY + place * num * line;
			
			ctx.strokeStyle = colors.checker[color].border;
			ctx.fillStyle = colors.checker[color].fill;
			
			ctx.beginPath();
			ctx.arc(checkerX, checkerY, border - 1 , 0, Math.PI * 2, true);
			ctx.fill();
			ctx.stroke();
			
			return checkers;
		}
		
		this.removeChecker = function () {
			if (0 === checkers) {
				return 0;
			}
			checkers -= 1;
			board.drawBoard();
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
}
