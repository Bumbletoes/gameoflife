/* 
 * Basic representation of a game tile
 */

// Constructor
function Tile(context) {
   this.x = 0;
   this.y = 0;
   this.height = 10;
   this.width = 10;
   this.context = context;
   this.lineWidth = 2;
   this.strokeStyle = '#000000';
   this.aliveColor = '#000000';
   this.deadColor = '#FFFFFF';
   this.activeColor = this.deadColor;
}

Tile.prototype.setX = function (x) {
    this.x = x;
};

Tile.prototype.setY = function(y) {
    this.y = y;
};

Tile.prototype.getX = function() {
  return this.x;
};

Tile.prototype.getY = function() {
  return this.y;
};

Tile.prototype.getHeight = function() {
  return this.height;
};

Tile.prototype.getWidth = function() {
  return this.width;
};

Tile.prototype.setSize = function(height, width) {
    this.height = height;
    this.width = width;
};

Tile.prototype.logPosition = function() {
    console.log('My position is (' + this.x + ',' + this.y + ')');
};

Tile.prototype.draw = function() {
    this.context.fillStyle = this.activeColor;
    this.context.lineWidth = this.lineWidth;
    this.context.strokeStyle = this.strokeStyle;
    this.context.strokeRect(this.x, this.y, this.width, this.height);
    //this.context.rect(this.x, this.y, this.width, this.height);
};
