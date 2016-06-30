angular.module('app').controller('LastSearchesController', function ($scope, $location){

  	$scope.goSchedules = function() {
	    $location.path('/schedules');	 
	    //seat.img = '../img/occupied_seat.png'
	};

});