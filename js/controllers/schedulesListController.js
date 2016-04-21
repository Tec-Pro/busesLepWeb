angular.module('app').controller('ScheduleController', function ($scope, $location, tripService, scheduleService, $filter){
	
  	$scope.schedules = tripService.getSchedules();
	
		$scope.origin = tripService.getTripOriginName();
	
		$scope.destination = tripService.getTripDestinationName();
	
  	$scope.goSummary = function(index) {
			var selectedSchedule = $scope.schedules[index];
			console.log(selectedSchedule);
			scheduleService.setScheduleFirstDepartureDatetime(selectedSchedule.fechahora);
			scheduleService.setScheduleFirstArrivalDatetime(selectedSchedule.FechaHoraLlegada);
			
			console.log(scheduleService.getSchedule());
			
	    $location.path('/summary');
			
	    //seat.img = '../img/occupied_seat.png'
	};
});
