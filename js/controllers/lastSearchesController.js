angular.module('app').controller('LastSearchesController', ['$scope', '$location', function ($scope, $location){

  	$scope.goSchedules = function() {
	    $location.path('/schedules');	 
	    //seat.img = '../img/occupied_seat.png'
	};

}]);