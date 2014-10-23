/*
 * Handles tile management
 */
function Gameboard(width, height){
	var tile;

	// This variable is a reference to the gameboard. It is 
	//  needed for click events because when an event handler is fired
	//  "this" is a reference to the canvas. Not the gameboard!
	var gameboard = this;

	this.canvas = $('#main-canvas')[0];
    this.context = this.canvas.getContext('2d');
    this.tiles = [];
    this.aliveTiles = [];

	// Keeps double clicking from selecting text on the canvas
	this.canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);

	this.canvas.addEventListener('mousedown', function(e) {
		var mouse = gameboard.getMouse(e);
		var tiles = gameboard.tiles;
	
		for (var x = 0; x < tiles.length; x++) {
			for(var y = 0; y < tiles[x].length; y++){
				if (tiles[x][y].contains(mouse.x, mouse.y)) {
					if(tiles[x][y].isAlive() === true){
						tiles[x][y].deActivate();
					}else{
						tiles[x][y].activate();
					}
					return;
				}
			}
		}
	}, true);

	for(var i = 0; i < width; i++){
		this.tiles[i] = [];
		for(var j = 0; j < height; j++){
			tile = new Tile(this.context);
			this.tiles[i][j] = tile;
		}
	}

	this.drawBoard();
}

Gameboard.prototype.drawBoard = function(){
	var tile;
	
	for(var x = 0; x < this.tiles.length; x++){
		for(var y = 0; y < this.tiles[x].length; y++){
			tile = this.tiles[x][y];
			tile.setX(x * tile.getWidth());
			tile.setY(y * tile.getHeight());

			tile.draw();
			//console.log('drawing tile at: ' + x + ',' + y);
		}
	}

	this.context.stroke();
};

Gameboard.prototype.getMouse = function(e) {
	var x = e.pageX - this.canvas.offsetLeft;
	var y = e.pageY - this.canvas.offsetTop;

	return {x: x, y: y};
};