angular.module('app').controller('ScheduleController', function ($scope, $location, tripService){
  	$scope.schedules = tripService.getSchedules();

		console.log($scope.schedules);
		$scope.origin = tripService.getTripOriginName();
	
		$scope.destination = tripService.getTripDestinationName();
	
  	$scope.goSummary = function() {
	    $location.path('/summary');	 
	    //seat.img = '../img/occupied_seat.png'
	};
});
