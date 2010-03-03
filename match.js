YUI.add('bgmatch', function (Y) {
	// Y.namespace('bgmatch');
	Y.namespace('bgmatch').match = function (id, options) {
		var board, container, canvas, games = [], selected, moves, size, direction;

		if ('undefined' === typeof(options)) {
			options = {};
		}
		
		selected = 0;
		size = ('undefined' === options.size) ? 36 : options.size;
		direction = ('undefined' === options.direction) ? 36 : options.direction;
		
		container = Y.one('#' + id);
		container.set('innerHTML', '');
		container.addClass('bgjs');
		
		canvas = 'bgboard_' + Math.random();
		container.append('<canvas class="bgboard" id="' + canvas + '">You need Canvas</canvas>');
		board = new bgboard(canvas, size, direction);
		
		games.push(new Y.bgmatch.game());
		
		container.append('<div class="controls"><div class="games">To be filled</div><div class="moves"></div></div>');
		moves = container.one('.moves');
		moves.append('<table><tr><th class="player0"/><th class="player1"/></tr></table>');
		moves = moves.one('tbody');
		
		//TODO: This is all just plainly stoopid!
		function drawGame(game) {
			var i, len, theMoves;
			moves.one('th.player0').append(game.getPlayer(0));
			moves.one('th.player1').append(game.getPlayer(1));
			theMoves = game.getMoves();
			
			for (i = 0, len = theMoves.length; i < len ;i += 2) {
				drawMove([theMoves[i], theMoves[i + 1]], i);
			}
		}
		
		function moveToStr(move) {
			var i, len, str = '';
			if (move.dice) {
				str += '' + move.dice[0] + move.dice[1] + ':';
				for (i = 0, len = move.moves.length; i < len ;i += 1) {
					str += ' ' + move.moves[i][0] + '/' + move.moves[i][1];
				}
			}
			return str;
		}
		
		function drawMove(move, num) {
			var tr, p0, p1;
			tr = Y.Node.create('<tr class="move">');
			
			p0 = tr.create('<td/>');
			p1 = tr.create('<td/>');
			p0.append(moveToStr(move[0]));
			p1.append(moveToStr(move[1]));
			tr.append(p0);
			tr.append(p1);
			moves.append(tr);
		}
		drawGame(games[0]);
	};
	
	//THIS IS ONLY A DUMMY
	Y.namespace('bgmatch').game = function () {};
	Y.namespace('bgmatch').game.prototype.getPlayer = function (number) {
			return 0 === number ? 'ana' : 'ebi';
	};
	
	Y.namespace('bgmatch').game.prototype.getMoves = function () {
		return [
			{},
			{
				dice: [6, 5],
				moves: [
					[24, 18],
					[13, 8],
				]
			},
			{
				dice: [6, 4],
				moves: [
					[13, 9],
					[13, '7*']
				]
			},
			{
				doubles: 2
			},
			{	takes: true
			},
			{
				dice: [3, 6],
				moves: [
					[25, 22],
					[24, '18*']
				]
			},
			{
				dice: [5, 2],
				moves: [
					[25, 20],
					[9, '7*']
				]
			},
			{
				dice: [3, 5],
				moves: [
					[25, 20],
					[13, 10]
				]
			}
		];
	};
},
"1.0.0",
{
	requires: ["node"]
});