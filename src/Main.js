(function(){
    $(document).ready(function(){
    	var gameboard = new Gameboard(96, 54);
    	var previousTile;
    	var currentX = 0;
    	var currentY = 0;


    	window.requestAnimFrame = (function(callback) {
    		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    		function(callback) {
    			window.setTimeout(callback, 1000 / 60);
    		};
    	})();

    	function animate(){
/*    		if(previousTile){
    			previousTile.deActivate();	
    		}

    		gameboard.getTileAt(currentX, currentY).activate();
    		previousTile = gameboard.getTileAt(currentX, currentY);

    		if(currentX === gameboard.getNumHorizontalTiles() - 1){
    			currentX = 0;
    			currentY++;
    		}else{
    			currentX++;
    		}

    		if(currentY === gameboard.getNumVerticalTiles()){
    			currentY = 0;
    			currentX = 0;
    		}
    		console.log(currentX, currentY);

    		requestAnimationFrame(function(){
    			animate();
    		}); */
    	}
    	
    	// wait one second before starting animation
    	setTimeout(function() {
    		var startTime = (new Date()).getTime();
    		animate();
    	}, 1000);
    	
    }); 
})();
