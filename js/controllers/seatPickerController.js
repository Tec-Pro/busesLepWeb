(function(){

	var seatPicker = angular.module('seatPicker', []);

	seatPicker.controller('SeatsController', function(){
		var seats = [];
		for (var i = 0; i < 80; i++) {
			seats.push({ img: '../img/free_seat.png',status: 1, id: i});
		}
  		this.products = seats;

	    this.toggleImage = function(seat) {
	    	switch(this.products[seat.id].status) {
			    case 1: // libre
			        this.products[seat.id].img = '../img/selected_seat.png';
	    			this.products[seat.id].status = 3;
			        break;
			    case 2: // ocupado no hace nada
			        break;
			    case 3: // seleccionado
			        this.products[seat.id].img = '../img/free_seat.png';
	    			this.products[seat.id].status = 1;
			        break;
			}
	        //seat.img = '../img/occupied_seat.png'
	    };
	});

	//status: 1=libre 2=ocupado 3=seleccionado
	//var seats = [
	    
	  /*  { img: '../img/free_seat.png',status: 1, id: 1},
	    { img: '../img/free_seat.png',status: 1, id: 2},
	    { img: '../img/free_seat.png',status: 1, id: 3},
	    { img: '../img/free_seat.png',status: 1, id: 4},
	    { img: '../img/free_seat.png',status: 1, id: 5},
	    { img: '../img/occupied_seat.png',status: 2, id: 6},
	    { img: '../img/free_seat.png',status: 1, id: 7},
	    { img: '../img/occupied_seat.png',status: 2, id: 8},	    
	    { img: '../img/free_seat.png',status: 1, id: 9},
	    { img: '../img/free_seat.png',status: 1, id: 10},
	    { img: '../img/occupied_seat.png',status: 2, id: 11},	    
	    { img: '../img/free_seat.png',status: 1, id: 12},
	    { img: '../img/free_seat.png',status: 1, id: 13},
	     { img: '../img/occupied_seat.png',status: 2, id: 14},
	    { img: '../img/free_seat.png',status: 1, id: 15},
	    { img: '../img/occupied_seat.png',status: 2, id: 16},	    
	    { img: '../img/free_seat.png',status: 1, id: 17},
	    { img: '../img/free_seat.png',status: 1, id: 18},
	    { img: '../img/occupied_seat.png',status: 2, id: 19},	    
	    { img: '../img/free_seat.png',status: 1, id: 20},
	    { img: '../img/free_seat.png',status: 1, id: 21}*/
  //	];

})();