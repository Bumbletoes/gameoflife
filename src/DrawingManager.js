DrawingManager = {};
(function(){
	DrawingManager = function(config){
		this.init(config);
	};

	DrawingManager.prototype = {
		init: function(config) {
			this._canvas = document.createElement('canvas');
			this._context = this._canvas.getContext('2d');
		},

		drawShape: function() {
			
		}
	};
})(); 