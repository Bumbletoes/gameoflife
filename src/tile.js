/* 
 * Basic representation of a game tile
 */

// Constructor
function Tile() {
   this.x = 0;
   this.y = 0;
   this.height = 100;
   this.width = 100;
}

Tile.prototype.setX = function (x) {
    this.x = x;
};

Tile.prototype.setY = function(y) {
    this.y = y;
};

Tile.prototype.setSize = function(height, width) {
    this.height = height;
    this.width = width;
};

Tile.prototype.logPosition = function() {
    console.log('My position is (' + this.x + ',' + this.y + ')');
};
