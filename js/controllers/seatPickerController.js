angular.module('app').controller('SeatsController', function ($scope, $location){

	
		$scope.seats = [];
		$scope.seats.push({ img: 'img/driver_seat.png',status: 4, id: 0});
		$scope.seats.push({ img: 'img/none_seat.png',status: 0, id: 1});
		$scope.seats.push({ img: 'img/none_seat.png',status: 0, id: 2});
		$scope.seats.push({ img: 'img/none_seat.png',status: 0, id: 3});
		$scope.seats.push({ img: 'img/none_seat.png',status: 0, id: 4});
		for (var i = 5; i < 65; i++) {
			if(i % 5 == 2 || i % 5 == 3){
				$scope.seats.push({ img: 'img/none_seat.png',status: 0, id: i});
			}
			else{
				$scope.seats.push({ img: 'img/free_seat.png',status: 1, id: i});
			}
		};
		$scope.seats.push({ img: 'img/free_seat.png',status: 1, id: 65});
		$scope.seats.push({ img: 'img/free_seat.png',status: 1, id: 66});
		$scope.seats.push({ img: 'img/free_seat.png',status: 1, id: 67});
		$scope.seats.push({ img: 'img/free_seat.png',status: 1, id: 68});
		$scope.seats.push({ img: 'img/free_seat.png',status: 1, id: 69});

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
	    	$location.path('/details');	 
		};

		$scope.goBack = function () {
			window.history.back();
		}

		$scope.range = function(min, max, step){
		    step = step || 1;
		    var input = [];
		    for (var i = min; i <= max; i += step) input.push(i);
		    return input;
  		};
});
