/*
 * Handles tile management
 */
function Gameboard(width, height){
	var tile;
	var gameboard = this;

	function checkBounds(x, y){
		return ((x < 0 || x >= gameboard.numHorizontalTiles) || 
				(y < 0 || y >= gameboard.numVerticalTiles) );
	}
	// Trying out a privileged method
	gameboard.outOfBounds = function(x,y){
		return checkBounds(x,y);
	};

	gameboard.canvas = $('#main-canvas')[0];
    gameboard.context = gameboard.canvas.getContext('2d');
    gameboard.tiles = [];
    gameboard.aliveTiles = [];
    gameboard.numHorizontalTiles = width;
    gameboard.numVerticalTiles = height;
    gameboard.clickedTile = null;

	// Keeps double clicking from selecting text on the canvas
	gameboard.canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);

	gameboard.canvas.addEventListener('mousedown', function(e) {
		var mouse = gameboard.getMouse(e);
		var tiles = gameboard.tiles;
		var neighbors;
	
		for (var x = 0; x < tiles.length; x++) {
			for(var y = 0; y < tiles[x].length; y++){
				if (tiles[x][y].contains(mouse.x, mouse.y)) {
					gameboard.clickedTile = tiles[x][y];

					if(tiles[x][y].isAlive() === true){
						gameboard.clickedTile.deActivate();
					}else{
						gameboard.clickedTile.activate();
					}
					return;
				}
			}
		}
	}, true);

	for(var i = 0; i < width; i++){
		gameboard.tiles[i] = [];
		for(var j = 0; j < height; j++){
			tile = new Tile(gameboard.context);
			tile.setXIndex(i);
			tile.setYIndex(j);
			gameboard.tiles[i][j] = tile;
		}
	}

	gameboard.drawBoard();
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

Gameboard.prototype.getNumHorizontalTiles = function() {
	return this.numHorizontalTiles;
};

Gameboard.prototype.getNumVerticalTiles = function() {
	return this.numVerticalTiles;
};

Gameboard.prototype.getTileAt = function(x, y) {
	return this.tiles[x][y];
};

Gameboard.prototype.getNeighbors = function (tile) {
	var neighborTiles = [];
	var x = tile.getX();
	var y = tile.getY();
	var currentX = 0;
	var currentY = 0;
	var possibleNeighbors = [
								{x: x - 1, y: y - 1}, // Top Left
								{x: x,     y: y - 1},     // Top Middle
								{x: x + 1, y: y - 1}, // Top Right
								{x: x - 1, y: y},     // Left
								{x: x + 1, y: y},        // Right
								{x: x - 1, y: y + 1},    // Bottom Left
								{x: x,     y: y + 1},     // Bottom
								{x: x + 1, y: y + 1}  // Bottom Right
							];

	for(var i = 0; i < possibleNeighbors.length; i++){
		currentX = possibleNeighbors[i].x;
		currentY = possibleNeighbors[i].y;
		if(this.outOfBounds(currentX, currentY) === false){
			neighborTiles.push(this.getTileAt(currentX, currentY));
		}
	}

	return neighborTiles;
};