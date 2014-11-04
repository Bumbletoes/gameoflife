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
    gameboard.allTiles = [];
    gameboard.numHorizontalTiles = width;
    gameboard.numVerticalTiles = height;

	// Keeps double clicking from selecting text on the canvas
	gameboard.canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);

	gameboard.canvas.addEventListener('mousedown', function(e) {
		var mouse = gameboard.getMouse(e);
		var tiles = gameboard.tiles;
		var neighbors;
	
		for (var x = 0; x < tiles.length; x++) {
			for(var y = 0; y < tiles[x].length; y++){
				if (tiles[x][y].contains(mouse.x, mouse.y)) {

					if(tiles[x][y].isAlive() === true){
						gameboard.deActivateTileAt(x, y);
					}else{
						gameboard.activateTileAt(x,y);
					}
					return;
				}
			}
		}
	}, true);

	for(var x = 0; x < width; x++){
		gameboard.tiles[x] = [];
		for(var y = 0; y < height; y++){
			tile = new Tile(gameboard.context);
			tile.setXIndex(x);
			tile.setYIndex(y);
			gameboard.tiles[x][y] = tile;
			gameboard.deActivateTileAt(x, y);
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

Gameboard.prototype.clearBoard = function(){
	var tile;
	
	for(var x = 0; x < this.tiles.length; x++){
		for(var y = 0; y < this.tiles[x].length; y++){
			tile = this.tiles[x][y];
			tile.setX(x * tile.getWidth());
			tile.setY(y * tile.getHeight());
			this.deActivateTileAt(x, y);

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

Gameboard.prototype.activateTileAt = function(x, y) {
	var deadTileIndex = this.getTileIndex(this.tiles[x][y], this.allTiles);
	this.aliveTiles.push(this.tiles[x][y]);
	this.tiles[x][y].activate();
};

Gameboard.prototype.deActivateTileAt = function(x, y) {
	var aliveTileIndex = this.getTileIndex(this.tiles[x][y], this.aliveTiles);
	
	if(aliveTileIndex <= -1){
		this.allTiles.push(this.tiles[x][y]);
	}else{
		this.aliveTiles.splice(aliveTileIndex, 1);
	}
	
	this.tiles[x][y].deActivate();
};

Gameboard.prototype.getTileIndex = function (tile, tileArray) {
	for(var i = 0; i < tileArray.length; i++){
		if(tileArray[i] === tile){
			return i;
		}
	}

	return -1;
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