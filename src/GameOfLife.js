/*
 * Uses the Gameboard class and 
 * runes the rules of the game
 * 
 * Trying something a little different with how I define this class.....
 */
var GameOfLife = {}; 
(function(){
	// reference to the GameOfLife class for access from inside closures
	var gameoflife; 
	GameOfLife = function(config){
		gameoflife = this;
		this.init(config);
		this.started = false;
		this.drawAcorn();
	};

	GameOfLife.prototype = {
		init: function(config){
			var conf = config || {};
			var gameboardWidth = conf.width || 10;
			var gameboardHeight = conf.height || 10;
			this.gameboard = new Gameboard(gameboardWidth, gameboardHeight);

			window.requestAnimFrame = (function(callback) {
				return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
				function(callback) {
					window.setTimeout(callback, 1000 / 60);
				};
			})();

			this.enterFrame();
		},

		start: function() {
			this.started = true;
			gameoflife.calculateBoard();
		},

		stop: function() {
			this.started = false;
		},

		reset: function() {
			this.started = false;
			this.gameboard.clearBoard();
			this.drawAcorn();
		},

		enterFrame: function(){
			if(gameoflife.started){
				//console.log('started!');
				gameoflife.calculateBoard();
			}
			requestAnimationFrame(gameoflife.enterFrame);	
		},

		calculateBoard: function() {
			var tile;
			var tilesToKill = gameoflife.checkAliveTiles();
			var tilesToActivate = gameoflife.checkTiles();
		

			for(var i = 0; i < tilesToKill.length; i++){
				tile = tilesToKill[i];
				gameoflife.gameboard.deActivateTileAt(tile.getX(), tile.getY()); 
			}

			for(var j = 0; j < tilesToActivate.length; j++){
				tile = tilesToActivate[j];
				gameoflife.gameboard.activateTileAt(tile.getX(), tile.getY()); 
			}
		},

		checkAliveTiles: function() {
			var aliveTiles = gameoflife.gameboard.aliveTiles;
			var tile;
			var neighbors = [];
			var aliveNeighbors = 0;
			var tilesToDeactivate = [];

			console.log('checking alive tiles: ' + aliveTiles.length);

			for(var i = 0; i < aliveTiles.length; i++){
				tile = aliveTiles[i];
				if(tile.isAlive()){
					aliveNeighbors++; 
				}

				neighbors = gameoflife.gameboard.getNeighbors(tile);

				for(var j = 0; j < neighbors.length; j++){
					if(neighbors[j].isAlive()){
						aliveNeighbors++;
					}
				}

				if(aliveNeighbors < 3 || aliveNeighbors > 3){
					tilesToDeactivate.push(tile);
				}

				aliveNeighbors = 0;
			}

			return tilesToDeactivate;
		},

		checkTiles: function() {
			var allTiles = gameoflife.gameboard.allTiles;
			var tile;
			var neighbors = [];
			var aliveNeighbors = 0;
			var tilesToActivate = [];

			console.log('checking dead tiles: ' + allTiles.length);

			for(var i = 0; i < allTiles.length; i++){
				tile = allTiles[i];
				neighbors = gameoflife.gameboard.getNeighbors(tile);

				for(var j = 0; j < neighbors.length; j++){
					if(neighbors[j].isAlive()){
						aliveNeighbors++;
					}
				}

				if(aliveNeighbors == 3){
					tilesToActivate.push(tile);
				}

				aliveNeighbors = 0;
			}

			return tilesToActivate;
		},

		drawAcorn: function() {
			var acornTiles = [{x: 39, y: 16},
							  {x: 39, y: 18},
							  {x: 38, y: 18},
							  {x: 41, y: 17},
							  {x: 42, y: 18},
							  {x: 43, y: 18},
							  {x: 44, y: 18}];

			for(var i = 0; i < acornTiles.length; i++){
				gameoflife.gameboard.activateTileAt(acornTiles[i].x, acornTiles[i].y);
			}
		}
	};	
 })();