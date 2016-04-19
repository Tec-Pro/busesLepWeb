angular.module('app').controller('ScheduleController', function ($scope, $location, tripService, $filter){
  	$scope.schedules = tripService.getSchedules();

		console.log(moment($scope.schedules[0].fechahora));
		console.log($filter('date')($scope.schedules[0].fechahora));
	
		$scope.origin = tripService.getTripOriginName();
	
		$scope.destination = tripService.getTripDestinationName();
	
  	$scope.goSummary = function() {
	    $location.path('/summary');	 
	    //seat.img = '../img/occupied_seat.png'
	};
});
