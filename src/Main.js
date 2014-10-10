(function(){
    $(document).ready(function(){

        var canvas = $('#main-canvas')[0];
        var context = canvas.getContext('2d');

        var tile = new Tile(context);
        tile.logPosition();
        tile.draw();
    }); 
})();
