Conway's Game of Life


Dev environment notes:
- Run bower install to install dependencies
- Run npm install grunt dependencies

Classes:
GameOfLife
Tile
Gameboard

NOTES:
  I think I really want to take all of the drawing responsibility away from Tile and Gameboard..
  Maybe build a canvas class or something... I'm not sure quite yet. 
  It would be nice to be able to plug in different drawing api's and still have the gameboard logic be intact

TODO:
 -- Add Conway's Rules
 
 Conway's Rules
 1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
 2. Any live cell with two or three live neighbours lives on to the next generation.
 3. Any live cell with more than three live neighbours dies, as if by overcrowding.
 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

-- Figure out animation/game classes. Do some clean up where needed.

