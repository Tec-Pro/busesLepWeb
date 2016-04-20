angular.module('app').controller('ScheduleController', function ($scope, $location, tripService, scheduleService, $filter){
	
  	$scope.schedules = tripService.getSchedules();
	
		$scope.origin = tripService.getTripOriginName();
	
		$scope.destination = tripService.getTripDestinationName();
	
  	$scope.goSummary = function() {
	    $location.path('/summary');
			
	    //seat.img = '../img/occupied_seat.png'
	};
});
