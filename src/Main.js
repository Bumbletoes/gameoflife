(function(){
    $(document).ready(function(){
    	var game = new GameOfLife({width:96, height:54});
    	game.start();
    }); 
})();