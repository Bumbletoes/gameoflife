/* 
 * Basic representation of a game tile
 */

// Constructor
function Tile(context) {
   this.x = 0;
   this.y = 0; 
   this.height = 9;
   this.width = 9;
   this.context = context;
   this.lineWidth = 1;
   this.aliveColor = '#000000';
   this.deadColor = '#FFFFFF';
   this.activeColor = this.deadColor;
   this.alive = false;
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
  return this.height + this.lineWidth;
};

Tile.prototype.getWidth = function() {
  return this.width + this.lineWidth;
};

Tile.prototype.isAlive = function() {
  return this.alive;
};

Tile.prototype.setSize = function(height, width) {
    this.height = height;
    this.width = width;
};

Tile.prototype.logPosition = function() {
    console.log('mouseY position is (' + this.x + ',' + this.y + ')');
};

Tile.prototype.draw = function() {
    this.context.lineWidth = this.lineWidth;
    this.context.strokeStyle = this.strokeStyle;
    this.context.fillStyle = this.activeColor;
    this.context.clearRect(this.x, this.y, this.width, this.height);
    this.context.strokeRect(this.x, this.y, this.width, this.height);
    this.context.fillRect(this.x, this.y, this.width, this.height);
};

Tile.prototype.activate = function() {
  this.activeColor = this.aliveColor;
  this.draw();
  this.alive = true;
};

Tile.prototype.deActivate = function() {
  this.activeColor = this.deadColor;
  this.draw();
  this.alive = false;
};

Tile.prototype.contains = function(mouseX, mouseY) {
  if((this.x <= mouseX) && (this.x + this.width >= mouseX) &&
    (this.y <= mouseY) && (this.y + this.height >= mouseY)){
    return true;
  }

  return false;
};
