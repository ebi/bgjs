/*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, newcap: true, immed: true */
/*global document */
var bar = 'bar';
function bgjs(id, scale, dir) {
	var init, drawField, drawFields, drawDirectionArrow,//Private Functions
	Field, //Objects
	that, canvas, ctx, line, border, width, height, colors, fields = [], direction = dir; //Properties
	
	that = this;
	
	colors = {
		background: 'lightblue',
		border: 'black',
		field: ['darkred', 'green'],
		checker: [
			{border: 'black', fill: 'red', text: 'black'},
			{border: 'black', fill: 'Lime', text: 'black'}
		],
		dice: [ //Strongly recommend you take similar color to the checkers
			{border: 'black', fill: 'red', text: 'black'},
			{border: 'black', fill: 'Lime', text: 'black'}
		],
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
			direction = 0;
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
	
	drawFields = function () {
		var lineHeight, i, x, y, type, yHeight, num;
		lineHeight = 5 * line;
		for (i = 0; i < 12 ;i += 1) {
			num = Math.abs(direction - i);
			type = i % 2;
			x = border + (i * line);
			if (5 < i) {
				x += 2 * line; //Add the bar
			}
			
			//Top Field
			drawField(x, border, lineHeight, colors.field[type], num, 1);
			
			//Bottom Field
			drawField(x, height - border, height - lineHeight, colors.field[!type + 0], 23 - num, -1);
		}
		
		//Create bars
		drawField(width / 2 - border, line, lineHeight, colors.border, 24, 1);
		drawField(width / 2 - border, height - line, lineHeight, colors.border, 25, -1);
	};
	
	drawField = function (x, y, yHeight, color, number, grow) {
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x + border, yHeight);
		ctx.lineTo(x + line, y);
		ctx.fill();
		if ('undefined' === typeof(fields[number])) {
			fields[number] = new Field(that, x, y, grow, 0);
		} else {
			fields[number].drawCheckers();
		}
		
		//Number fields
		if (number < 24) {
			ctx.textAlign = 'center';
			ctx.font = '800 ' + scale / 3 + 'px Helvetica, sans-serif';
			ctx.fillStyle = colors.text;
			
			//TODO: Improve text placement
			ctx.fillText(number + 1, x + line / 2, y - (grow - 1) * line / 4 - 2);
		}
	};
	
	drawDirectionArrow = function () {
		var x, y, size, len;
		
		size = border / 2;
		len = 2 * (size / 3);
		ctx.save();
		
		if (0 === direction) {
			ctx.translate(2,2);
		} else {
			ctx.translate(width - 2, size * 2 + 2);
			ctx.rotate(Math.PI);
		}
		
		ctx.fillStyle = colors.checker[1].fill;
		ctx.translate(0, 0);
		ctx.beginPath();
		ctx.moveTo(0, size);
		ctx.lineTo(size, 0);
		ctx.lineTo(size, len);
		ctx.lineTo(2 * size, len);
		ctx.lineTo(2 * size, 2 * size - len);
		ctx.lineTo(size, 2 * size - len);
		ctx.lineTo(size, 2 * size);
		ctx.lineTo(0, size);
		ctx.fill();
		ctx.restore();
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
		
		
		drawDirectionArrow();
	};
	
	this.move = function (from, to, type) {
		from -= 1;
		if ('bar' === to) {
			to = 24 + fields[from].getType();
			type = fields[from].getType();
		} else {
			to -= 1;
		}
		
		if ('undefined' !== typeof(fields[from])) {
			type = fields[from].getType();
			fields[from].removeChecker();
		} else if ('undefined' === typeof(type)) {
			type = 0;
		}
		
		if ('undefined' !== typeof(fields[to])) {
			fields[to].addChecker(type);
		}
	};
	
	Field = function (boardRef, posX, posY, grow, type) {
		var that, board, fieldX, fieldY, place, checkers = 0, color;
		that = this;
		board = boardRef;
		color = type;
		place = grow;
		fieldX = posX + line / 2;
		fieldY = posY + place * line / 2;
		
		this.getType = function () {
			return color;
		};
		
		this.addChecker = function (type) {
			if (color !== type) {
				color = type;
				if (checkers > 0) {
					this.drawCheckers();
				}
			}
			
			this.drawChecker(checkers);
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
			ctx.strokeStyle = colors.checker[color].border;
			ctx.fillStyle = colors.checker[color].fill;
			
			if (5 > num) {
				checkerY = fieldY + place * num * line;
			
				ctx.beginPath();
				ctx.arc(checkerX, checkerY, border, 0, Math.PI * 2, true);
				ctx.fill();
				ctx.stroke();
			} else {
				//TODO: Improve text placement
				checkerY = fieldY + place * 4 * line;
				ctx.fillRect(checkerX - line / 3.5, checkerY - line / 3.5, line / 2, line / 2);
				ctx.fillStyle = colors.checker[color].text;
				ctx.textAlign = 'center';
				ctx.font = '800 ' + scale / 2.5 + 'px Helvetica, sans-serif';
				ctx.fillText(num, checkerX, checkerY);
			}
			
			return checkers;
		};
		
		this.removeChecker = function () {
			if (0 === checkers) {
				return 0;
			}
			checkers -= 1;
			board.drawBoard();
			return checkers;
		};
		
		this.countChecker = function () {
			return checkers;
		};
	};
	
	init(id, scale);
}
