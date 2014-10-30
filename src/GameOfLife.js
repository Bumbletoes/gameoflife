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
		},

		start: function() {
			this.enterFrame();
		},

		enterFrame: function(){
			requestAnimationFrame(gameoflife.enterFrame);
		}
	};	
 })();