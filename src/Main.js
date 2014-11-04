(function(){
    $(document).ready(function(){	
    	var game = new GameOfLife({width:96, height:54});	

    	$('#start-button').click(function(){
    		game.start();
    	});

    	$('#reset-button').click(function(){
    		game.reset();
    	});

    	$('#stop-button').click(function(){
    		game.stop();
    	});

        $('#acorn-button').click(function(){
            game.drawAcorn();
        });

        $('#gun-button').click(function(){
            game.drawGun();
        });
    }); 
})();