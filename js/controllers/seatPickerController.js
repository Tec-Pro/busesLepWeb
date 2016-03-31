angular.module('app').controller('SeatsController', function ($scope, $location){

	
		$scope.seats = [];
		for (var i = 0; i < 80; i++) {
			$scope.seats.push({ img: 'img/free_seat.png',status: 1, id: i});
		};

	    $scope.toggleImage = function(seat) {
	    	switch($scope.seats[seat.id].status) {
			    case 1: // libre
			       $scope.seats[seat.id].img = 'img/selected_seat.png';
	    			$scope.seats[seat.id].status = 3;
			        break;
			    case 2: // ocupado no hace nada
			        break;
			    case 3: // seleccionado
			       $scope.seats[seat.id].img = 'img/free_seat.png';
	    			$scope.seats[seat.id].status = 1;
			        break;
			}
	        //seat.img = '../img/occupied_seat.png'
	    };

	    $scope.goDetails= function() {
	    	$location.path('/details/1/1');	 
		};
});
