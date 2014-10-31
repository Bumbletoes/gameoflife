(function(){
    $(document).ready(function(){	
    	var game = new GameOfLife({width:96, height:54});	

    	$('#start-button').click(function(){
    		game.start();
    	});

    	$('#reset-button').click(function(){
    		game.reset();
    	});
    }); 
})();