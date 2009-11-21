/*global document */
function bgjs(id, scale) {
	var init, drawBoard, drawFields,//Private Functions
	field, //Objects
	that, canvas, ctx, line, border, width, height, colors, fields = []; //Properties
	
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
			type = i % 2;
			x = border + (i * line);
			if (5 < i) {
				x += 2 * line; //Add the bar
			}
			
			//TODO: Extract field drawing to function
			
			//Top Field
			y = border;
			yHeight = lineHeight;
			ctx.fillStyle = colors.field[type];
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x + border, yHeight);
			ctx.lineTo(x + line, y);
			ctx.fill();
			if ('undefined' === typeof(fields[i])) {
				fields[i] = new field(that, x, y, i, 0);
			} else {
				fields[i].drawCheckers();
			}
			
			//Bottom Field
			y = height - border;
			yHeight = height - lineHeight;
			if ('undefined' === typeof(fields[i + 12])) {
				fields[i + 12] = new field(that, x, y, i + 12, 0);
			} else {
				fields[i + 12].drawCheckers();
			}
			ctx.fillStyle = colors.field[!type + 0];
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x + border, yHeight);
			ctx.lineTo(x + line, y);
			ctx.fill();
		}
	};
	
	field = function(boardRef, posX, posY, number, type) {
		var that, board, fieldX, fieldY, position = number, place, checkers = 0, color;
		that = this;
		board = boardRef;
		color = colors.checker[type];
		place = (number < 12) ? 1 : -1;
		fieldX = posX + place * line / 2;
		fieldY = posY + place * line / 2;
		
		this.addChecker = function (type) {
			if (color !== colors.checker[type]) {
				color = colors.checker[type];
				checkers += 1;
				this.drawCheckers();
			} else {
				this.drawChecker(checkers)
				checkers += 1;
			}
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
			
			ctx.strokeStyle = color.border;
			ctx.fillStyle = color.fill;
			
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
