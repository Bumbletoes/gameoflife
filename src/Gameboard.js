/*
 * Handles tile management
 */
function Gameboard(width, height){
	var canvas = $('#main-canvas')[0];
    this.context = canvas.getContext('2d');
    var tile; 

	this.tiles = [];

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

Gameboard.prototype.getTileAt = function(x, y){
	return this.tiles[x][y];
};